import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { ProjectService, IProject } from '../../project.service';
import { MessageService } from '../../../../message.service';
import { ActivatedRoute } from '@angular/router';
import { IRender, RenderService } from '../../render.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../auth/auth.service';

@Component({
    selector: 'app-project-item',
    templateUrl: './project-item.component.html',
    styleUrls: ['./project-item.component.sass']
})
export class ProjectItemComponent implements OnInit {
    projectId: number | undefined;
    project: IProject | undefined;
    isLoadingProject: boolean = false;
    isMyProject: boolean = false;
    indexTab = 1;

    constructor(
        private msg: NzMessageService,
        private projectService: ProjectService,
        private messageService: MessageService,
        private authService: AuthService,
        private route: ActivatedRoute
    ) {
        this.route.queryParams.subscribe(params => {
            this.projectId = this.route.snapshot.params['projectId'];
        });
    }

    ngOnInit(): void {
        this.getProject();
    }

    getProject() {
        this.isLoadingProject = true;
        this.projectService.findById(this.projectId!).subscribe({
            next: (project: IProject) => {
                this.project = project;
                this.isMyProject = this.checkIsMyProject(this.project);
                console.log(this.project);
                console.log(this.isMyProject);
            },
            error: (err: any) => {
                console.log(err)
                let message = err.error.message;
                this.messageService.createMessage('error', `${message ? message : 'Виникла невідома помилка'}`);
                this.isLoadingProject = false;
            },
            complete: () => {
                this.isLoadingProject = false;
            }
        });
    }

    checkIsMyProject(project: IProject): boolean {
        let payload = this.authService.decodedAccessToken();
        let userId = payload.user.id;
        return userId === project.user?.id;
    }
}

