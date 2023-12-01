import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService, ICreateProjectDto, IProject } from '../../project.service';
import { MessageService } from '../../../../message.service';
const { v4: uuidv4 } = require('uuid');
@Component({
    selector: 'app-create-project',
    templateUrl: './create-project.component.html',
    styleUrls: ['./create-project.component.sass']
})
export class CreateProjectComponent {
    isCreateLoading: boolean = false;
    createForm: FormGroup = this._fb.group({
        name: [null, [Validators.required]],
        description: [null, [Validators.required]],
        tags: [null, [Validators.required]],
        uuidToken: [null, [Validators.required]]
    });
    constructor(
        private _fb: FormBuilder,
        private _router: Router,
        private projectService: ProjectService,
        private messageService: MessageService,
    ) {
        this.generateUUID()
    }

    create(createProjectDto: ICreateProjectDto) {
        this.isCreateLoading = true;
        this.projectService.create(createProjectDto).subscribe({
            next: (project: IProject) => {
                this.messageService.createMessage('success', `Проект ${project.name} успішно створено!`);
                this._router.navigate(['/', 'profile', 'projects'])
            },
            error: (err: any) => {
                let message = err.error.message;
                this.messageService.createMessage('error', `${message ? message : 'Виникла невідома помилка'}`);
                this.isCreateLoading = false;
            },
            complete: () => {
                this.isCreateLoading = false;
            }
        })
    }

    onButtonCreateClick() {
        if (this.createForm.valid) {
            let project: ICreateProjectDto = {
                name: this.createForm.controls['name'].value,
                description: this.createForm.controls['description'].value,
                tags: (this.createForm.controls['tags'].value as string[]).join(' '),
                uuidToken: this.createForm.controls['uuidToken'].value
            }
            this.create(project);
        } else {
            this.messageService.createMessage('error', `Форма не валідна!`);
        }
    }

    generateUUID() {
        this.createForm.controls['uuidToken'].setValue(uuidv4());
    }
}
