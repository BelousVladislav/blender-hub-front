import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/projects' },
    { path: 'projects', loadChildren: () => import('./pages/project/project.module').then(m => m.ProjectModule) },
    { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
    { path: 'docs', loadChildren: () => import('./pages/docs/docs.module').then(m => m.DocsModule) },
    { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) },
    { path: 'workers', loadChildren: () => import('./pages/worker/worker.module').then(m => m.WorkerModule) },
    { path: '**', redirectTo: 'projects' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
