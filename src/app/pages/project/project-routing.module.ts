import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project.component';
import { ProjectItemComponent } from './components/project-item/project-item.component';

const routes: Routes = [
    { path: '', component: ProjectComponent },
    {
        path: ':projectId',
        component: ProjectItemComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectRoutingModule { }
