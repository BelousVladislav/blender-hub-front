import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { MessageService } from '../../../../message.service';
import { Router } from '@angular/router';
import { SubjectService } from '../../../../subject.service';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.sass']
})
export class AuthenticationComponent {
    validateForm!: UntypedFormGroup;
    isLoginLoading: boolean = false;
    access_token: string | undefined;
    constructor(
        private fb: UntypedFormBuilder,
        private authService: AuthService,
        private messageService: MessageService,
        private router: Router,
        private subjectService: SubjectService
    ) { }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            login: [null, [Validators.required]],
            password: [null, [Validators.required]],
            remember: [true]
        });
        this.validateForm.controls['login'].setValue('Vladislav');
        this.validateForm.controls['password'].setValue('Vladislav110598');
    }

    login(data: { login: string, password: string }) {
        this.isLoginLoading = true;
        this.authService.login(data).subscribe({
            next: (data: { access_token: string }) => {
                this.access_token = data.access_token;
                this.authService.setToken(this.access_token);
                this.subjectService.loginSubject.next(true);
                this.messageService.createMessage('success', 'Вхід виконано');
                this.authService.profile().toPromise().then(data => console.log(data))
                this.router.navigate(['/', 'profile', 'projects'])
            },
            error: (err: any) => {
                let message = err.error.message;
                this.messageService.createMessage('error', `${message ? message : 'Виникла невідома помилка'}`);
                this.isLoginLoading = false;
            },
            complete: () => {
                this.isLoginLoading = false;
            }
        })
    }

    submitForm(): void {
        if (this.validateForm.valid) {
            let loginData: { login: string, password: string } = {
                login: this.validateForm.controls['login'].value,
                password: this.validateForm.controls['password'].value
            }
            this.login(loginData);
        } else {
            Object.values(this.validateForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }



}
