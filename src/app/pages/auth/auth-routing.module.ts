import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
    { path: '', component: AuthenticationComponent },
    { path: 'authentication', component: AuthenticationComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: '**', component: AuthenticationComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
