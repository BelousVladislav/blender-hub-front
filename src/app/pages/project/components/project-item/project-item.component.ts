import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProjectService, IProject } from '../../project.service';
import { MessageService } from '../../../../message.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { UnsubscriptionError } from 'rxjs';

@Component({
    selector: 'app-project-item',
    templateUrl: './project-item.component.html',
    styleUrls: ['./project-item.component.sass']
})
export class ProjectItemComponent implements OnInit {
    myUserId: number | undefined;
    projectId: number | undefined;
    project: IProject | undefined;
    isLoadingProject: boolean = false;
    isMyProject: boolean = false;
    indexTab = 0;
    tagsColor: string[] = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']

    constructor(
        private msg: NzMessageService,
        private projectService: ProjectService,
        private messageService: MessageService,
        private authService: AuthService,
        private route: ActivatedRoute,
    ) {
        this.route.queryParams.subscribe(params => {
            this.projectId = this.route.snapshot.params['projectId'];
        });
        this.myUserId = this.authService.getUserIdFromToken();
    }

    ngOnInit(): void {
        this.getProject();
    }

    getProject() {
        this.isLoadingProject = true;
        this.projectService.findById(this.projectId!).subscribe({
            next: (project: IProject) => {
                this.project = project;
                this.project.tagsArr = [];
                project.tags.split(' ').forEach(tag => {
                    project.tagsArr?.push({
                        name: tag,
                        color: this.getRandomTagColor()
                    })
                });
                // this.isMyProject = this.checkIsMyProject(this.project);
                // console.log(this.isMyProject);
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

    getRandomTagColor() {
        return this.tagsColor[Math.floor(Math.random() * this.tagsColor.length)];
    }

    checkIsMyProject(project: IProject): boolean {
        let payload = this.authService.decodedAccessToken();
        let userId = payload.user.id;
        return userId === project.user?.id;
    }

    onUpdateProject(project: IProject) {
        this.project!.name = project.name;
        this.project!.description = project.description;
        this.project!.tags = project.tags;
        project.tagsArr = [];
        project.tags.split(' ').forEach(tag => {
            project.tagsArr?.push({
                name: tag,
                color: this.getRandomTagColor()
            })
        });
        this.project!.tagsArr = project.tagsArr
    }
}

