import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProjectsComponent } from './components/my-projects/my-projects.component';
import { MyWorkerComponent } from './components/my-worker/my-worker.component';
import { MyDataComponent } from './components/my-data/my-data.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/profile/projects' },
    { path: 'projects', component: MyProjectsComponent },
    { path: 'worker', component: MyWorkerComponent },
    { path: 'info', component: MyDataComponent },
    { path: '**', redirectTo: '/profile/projects' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
