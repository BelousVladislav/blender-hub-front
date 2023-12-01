import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService, IUpdateProjectDto, IProject } from '../../../../project.service';
import { MessageService } from '../../../../../../message.service';
const { v4: uuidv4 } = require('uuid');
@Component({
    selector: 'app-project-item-setting',
    templateUrl: './project-item-setting.component.html',
    styleUrls: ['./project-item-setting.component.sass']
})
export class ProjectItemSettingComponent implements OnInit {
    @Input() project: IProject | undefined;
    @Input() myUserId: number | undefined;
    @Output() onChanged = new EventEmitter<IProject>();
    isUpdateLoading: boolean = false;
    isDeleteLoading: boolean = false;
    updateForm: FormGroup = this._fb.group({
        name: [null, [Validators.required]],
        description: [null, [Validators.required]],
        tags: [null, [Validators.required]],
        uuidToken: [null]
    });

    constructor(
        private _fb: FormBuilder,
        private _router: Router,
        private projectService: ProjectService,
        private messageService: MessageService,
    ) { }

    ngOnInit(): void {
        if (this.project) {
            this.updateForm.controls['name'].setValue(this.project.name);
            this.updateForm.controls['description'].setValue(this.project.description);
            this.updateForm.controls['tags'].setValue(this.project.tagsArr?.map(tag => tag.name));
        }
    }

    update(updateProjectDto: IUpdateProjectDto) {
        this.isUpdateLoading = true;
        this.projectService.update(updateProjectDto).subscribe({
            next: (project: IProject) => {
                this.onChanged.emit(project);
                this.messageService.createMessage('success', `Проект ${project.name} успішно оновлено`);
            },
            error: (err: any) => {
                let message = err.error.message;
                this.messageService.createMessage('error', `${message ? message : 'Виникла невідома помилка'}`);
                this.isUpdateLoading = false;
            },
            complete: () => {
                this.isUpdateLoading = false;
            }
        })
    }

    onButtonUpdateClick() {
        if (this.updateForm.valid) {
            let project: IUpdateProjectDto = {
                id: this.project!.id,
                name: this.updateForm.controls['name'].value,
                description: this.updateForm.controls['description'].value,
                tags: (this.updateForm.controls['tags'].value as string[]).join(' ')
            }
            if (this.updateForm.controls['uuidToken'].value)
                project.uuidToken = this.updateForm.controls['uuidToken'].value;
            this.update(project);
        } else {
            this.messageService.createMessage('error', `Форма не валідна!`);
        }
    }

    deleteProject() {
        this.isDeleteLoading = true;
        this.projectService.delete(this.project!.id).subscribe({
            next: () => {
                this.messageService.createMessage('success', `Проект успішно видалено`);
                this._router.navigate(['/', 'profile', 'projects']);
            },
            error: (err: any) => {
                let message = err.error.message;
                this.messageService.createMessage('error', `${message ? message : 'Виникла невідома помилка'}`);
                this.isDeleteLoading = false;
            },
            complete: () => {
                this.isDeleteLoading = false;
            }
        })
    }

    generateUUID() {
        this.updateForm.controls['uuidToken'].setValue(uuidv4());
    }
}
