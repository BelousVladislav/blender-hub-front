import { Component } from '@angular/core';
import { SubjectService } from './subject.service';
import * as jwt_decode from 'jwt-decode';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {
    login: string = '';
    isCollapsed = false;
    profileVisible: boolean = true;
    constructor(
        private subjectService: SubjectService
    ) {
        this.subjectService.loginSubject.subscribe(data => {
            if (data[1]) {
                let payload = this.getDecodedAccessToken(data[1]);
                this.login = payload.user.login
            }
            this.profileVisible = !this.profileVisible;
        });
        let token = localStorage.getItem('access_token')
        if (token) {
            let payload = this.getDecodedAccessToken(token);
            this.login = payload.user.login
            this.profileVisible = false;
        }
    }

    getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode.jwtDecode(token);
        } catch (Error) {
            return null;
        }
    }
}
