import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { MessageService } from '../../../../message.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth.service';
import { ICreateUserDto, IUser } from '../../../user/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {
    validateForm!: UntypedFormGroup;
    captchaTooltipIcon: NzFormTooltipIcon = {
        type: 'info-circle',
        theme: 'twotone'
    };
    isRegisterLoading: boolean = false;

    constructor(
        private fb: UntypedFormBuilder,
        private authService: AuthService,
        private messageService: MessageService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            email: ['', [Validators.email, Validators.required]],
            password: [null, [Validators.required]],
            checkPassword: [null, [Validators.required, Validators.minLength(8), this.confirmationValidator]],
            login: [null, [Validators.required]],
        });

        // this.validateForm.controls['login'].setValue('Belya170372@gmail.com');
        // this.validateForm.controls['password'].setValue('Belya170372@gmail.com');
        // this.validateForm.controls['email'].setValue('Belya170372@gmail.com');
        // this.validateForm.controls['checkPassword'].setValue('Belya170372@gmail.com');

    }

    register(createUserDto: ICreateUserDto) {
        this.isRegisterLoading = true;
        this.authService.register(createUserDto).subscribe({
            next: (data: IUser) => {
                this.messageService.createMessage('success', 'Реєстрація пройшла успішно');
                this.router.navigate(['/', 'auth', 'authentication'])
            },
            error: (err: any) => {
                let message = err.error.message;
                this.messageService.createMessage('error', `${message ? message : 'Виникла невідома помилка'}`);
                this.isRegisterLoading = false;
            },
            complete: () => {
                this.isRegisterLoading = false;
            }
        })
    }

    submitForm(): void {
        if (this.validateForm.valid) {
            let user: ICreateUserDto = {
                login: this.validateForm.controls['login'].value,
                password: this.validateForm.controls['password'].value,
                email: this.validateForm.controls['email'].value
            }
            this.register(user);
        } else {
            this.messageService.createMessage('Error', 'Форма не валідна')
        }
    }

    updateConfirmValidator(): void {
        /** wait for refresh value */
        Promise.resolve().then(() => this.validateForm.controls['checkPassword'].updateValueAndValidity());
    }

    confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.validateForm.controls['password'].value) {
            return { confirm: true, error: true };
        }
        return {};
    };

    getCaptcha(e: MouseEvent): void {
        e.preventDefault();
    }


}
