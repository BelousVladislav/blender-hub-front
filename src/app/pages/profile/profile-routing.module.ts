import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProjectsComponent } from './components/my-projects/my-projects.component';
import { MyWorkerComponent } from './components/my-worker/my-worker.component';
import { MyDataComponent } from './components/my-data/my-data.component';
import { ProjectItemComponent } from '../project/components/project-item/project-item.component';
import { CreateProjectComponent } from '../project/components/create-project/create-project.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/profile/projects' },
    {
        path: 'projects',
        // component: MyProjectsComponent,
        children: [
            {
                path: '',
                component: MyProjectsComponent
            },
            {
                path: 'create',
                component: CreateProjectComponent
            },
            {
                path: ':projectId',
                component: ProjectItemComponent
            },
        ]
    },
    { path: 'worker', component: MyWorkerComponent },
    { path: 'info', component: MyDataComponent },
    { path: '**', redirectTo: '/profile/projects' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
