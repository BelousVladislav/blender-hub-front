import { Component, Input } from '@angular/core';
import { ProjectService, IProject } from '../../project.service';
import { MessageService } from '../../../../message.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.sass']
})
export class ProjectListComponent {
    projects: IProject[] = [];
    isProjectsLoading: boolean = false;
    tagsColor: string[] = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
    searchText: string = '';
    @Input() isMy: boolean = false;
    constructor(
        private projectService: ProjectService,
        private messageService: MessageService,
    ) { }

    ngOnInit(): void {
        this.getProjects();
    }

    getRandomTagColor() {
        return this.tagsColor[Math.floor(Math.random() * this.tagsColor.length)];
    }

    getArrayTagsFromString(tagsStr: string) {
        return tagsStr.split(' ');
    }

    getProjects() {
        this.isProjectsLoading = true;
        let funct: Observable<IProject[]> = this.projectService.findAll();
        if (this.isMy)
            funct = this.projectService.findMy();
        funct.subscribe({
            next: (projects: IProject[]) => {
                this.projects = projects.map(project => {
                    project.tagsArr = [];
                    project.tags.split(' ').forEach(tag => {
                        project.tagsArr?.push({
                            name: tag,
                            color: this.getRandomTagColor()
                        })
                    });
                    return project
                });
            }, error: (err: any) => {
                let message = err.error.message;
                this.messageService.createMessage('error', `${message ? message : 'Виникла невідома помилка'}`);
                this.isProjectsLoading = false;
            },
            complete: () => {
                this.isProjectsLoading = false;
            }
        })
    }
}
