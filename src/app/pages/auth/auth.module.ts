import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { AuthService } from './auth.service';


@NgModule({
    declarations: [
        AuthenticationComponent,
        RegistrationComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        RouterModule,
        NzFormModule,
        FormsModule,
        ReactiveFormsModule,
        NzInputModule,
        NzButtonModule,
        NzCardModule,
        NzCheckboxModule,
        NzTypographyModule
    ],
    providers: [AuthService]
})
export class AuthModule { }
