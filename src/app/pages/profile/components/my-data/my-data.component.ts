import { Component, OnInit } from '@angular/core';
import { UserService, IUser, IUpdateUserDto } from '../../../user/user.service';
import { AuthService } from '../../../auth/auth.service';
import { MessageService } from '../../../../message.service';
import { SubjectService } from '../../../../subject.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
const { v4: uuidv4 } = require('uuid');
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
    selector: 'app-my-data',
    templateUrl: './my-data.component.html',
    styleUrls: ['./my-data.component.sass']
})
export class MyDataComponent implements OnInit {
    isUserLoading: boolean = false;
    isUpdateUserLoading: boolean = false;
    user: IUser | undefined;
    isEditMode: boolean = false;
    editForm: FormGroup = this._fb.group({
        login: [null, [Validators.required]],
        password: [null, [Validators.required]],
        checkPassword: [null, [Validators.required, Validators.minLength(8)]],
        email: [null, [Validators.email, Validators.required]],
        client_uuid: [null, [Validators.required]],
        worker_uuid: [null, [Validators.required]],
    })
    constructor(
        private userService: UserService,
        private authService: AuthService,
        private messageService: MessageService,
        private subjectService: SubjectService,
        private _router: Router,
        private _fb: FormBuilder,
        private notification: NzNotificationService
    ) { }

    ngOnInit() {
        this.getMyInfo();
    }

    getMyInfo() {
        this.isUserLoading = true;
        this.userService.findById(this.authService.decodedAccessToken().user.id).subscribe({
            next: (user: IUser) => {
                this.user = user;
            }, error: (err: any) => {
                let message = err.error.message;
                this.messageService.createMessage('error', `${message ? message : 'Виникла невідома помилка'}`);
                this.isUserLoading = false;
            },
            complete: () => {
                this.isUserLoading = false;
            }
        })
    }

    logout() {
        this.authService.removeToken();
        this.subjectService.loginSubject.next([false, '']);
        this._router.navigate(['/', 'auth', 'authentication']);
    }

    onEditButtonCLick() {
        this.isEditMode = !this.isEditMode
        if (this.isEditMode) {
            this.editForm = this._fb.group({
                login: [this.user?.login, [Validators.required]],
                password: [null, [Validators.required]],
                checkPassword: [null, [Validators.required, Validators.minLength(8), this.confirmationValidator]],
                email: [this.user?.email, [Validators.email, Validators.required]],
                client_uuid: [this.user?.client_uuid, [Validators.required]],
                worker_uuid: [this.user?.worker_uuid, [Validators.required]],
            })
        } else {
            // this.editForm = this._fb.group({});
        }
    }

    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.editForm!.controls['password'].value) {
            return { confirm: true, error: true };
        }
        return {};
    };

    updateConfirmValidator(): void {
        /** wait for refresh value */
        Promise.resolve().then(() => this.editForm.controls['checkPassword'].updateValueAndValidity());
    }

    generateUUID() {
        return uuidv4();
    }

    generateClientUUID() {
        this.editForm.controls['client_uuid'].setValue(this.generateUUID());
    }

    generateWorkerUUID() {
        this.editForm.controls['worker_uuid'].setValue(this.generateUUID());
    }


    updateUser(user: IUpdateUserDto) {
        this.isUpdateUserLoading = true;
        this.userService.update(user).subscribe({
            next: (data) => {
                if (user.password || this.user!.login !== user.login) {
                    this.notification.create('info', 'Повторіть вхід', 'Так як ви змінили логін або пароль, вам необхідно виконати вхід знову');
                    this.logout();
                }
                this.user!.login = user.login;
                this.user!.email = user.email;
                this.user!.client_uuid = user.client_uuid;
                this.user!.worker_uuid = user.worker_uuid;
                this.messageService.createMessage('success', 'Інформацію змінено');
                this.isEditMode = false;
            },
            error: (err) => {
                console.log(err);
                this.isUpdateUserLoading = false;
                this.messageService.createMessage('error', 'ВИникла помилка діп час заміни інформації');
            },
            complete: () => {
                this.isUpdateUserLoading = false;
            }
        })
    }

    onSaveButtonClick() {
        if (
            this.editForm.controls['login'].valid &&
            this.editForm.controls['email'].valid &&
            this.editForm.controls['client_uuid'].valid &&
            this.editForm.controls['worker_uuid'].valid &&
            (
                (
                    this.editForm.controls['password'].value &&
                    this.editForm.controls['password'].valid &&
                    this.editForm.controls['checkPassword'].valid
                )
                ||
                !this.editForm.controls['password'].value
            )
        ) {
            let nUser: IUpdateUserDto = {
                id: this.user!.id,
                login: this.editForm.controls['login'].value,
                email: this.editForm.controls['email'].value,
                client_uuid: this.editForm.controls['client_uuid'].value,
                worker_uuid: this.editForm.controls['worker_uuid'].value
            }
            if (this.editForm.controls['password'].value)
                nUser.password = this.editForm.controls['password'].value;
            this.updateUser(nUser);
        } else {
            this.messageService.createMessage('error', 'Форма не валідна');
        }
    }
}
