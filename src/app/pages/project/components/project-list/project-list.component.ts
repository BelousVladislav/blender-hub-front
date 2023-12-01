import { Component, Input } from '@angular/core';
import { ProjectService, IProject } from '../../project.service';
import { MessageService } from '../../../../message.service';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.sass']
})
export class ProjectListComponent {
    projects: IProject[] = [];
    isProjectsLoading: boolean = false;
    tagsColor: string[] = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];
    searchText: string = '';
    autorSearchText: string = '';
    @Input() isMy: boolean = false;
    constructor(
        private projectService: ProjectService,
        private messageService: MessageService,
        private rout: Router,
        private router: ActivatedRoute
    ) {
        this.router.queryParams.subscribe(data => {
            if (Object(data).hasOwnProperty('search')) {
                this.autorSearchText = Object(data).search;
            } else {
                this.autorSearchText = '';
            }
        })
    }

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
                this.projects.map(project => {
                    return project.renders = project.renders.filter(render => render.statusId === 3).sort((a, b) => b.id - a.id);
                })
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

    getPhotoSrc(project: IProject) {
        if (project.renders[0])
            return environment.apiKey.replace('api/', '') + '/' + project.renders[0].outFileUUIDName || '';
        return '/assets/noimage.png';
    }

    filterProjects() {
        if (this.searchText === '' && this.autorSearchText === '')
            return this.projects;
        return this.projects.filter(project => {
            return ((project.name.match(this.searchText) || project.tags.match(this.searchText) || project.user!.login.match(this.searchText)) && (project.user!.login.match(this.autorSearchText)))
        })
    }

    onLoginClick(login: string) {
        this.rout.navigate(['/', 'projects'], { queryParams: { search: login } });
    }

    onCloseAutorTag(e: Event) {
        this.autorSearchText = '';
        this.rout.navigate(['.']);
    }
}
