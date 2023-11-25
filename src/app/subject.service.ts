import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from './pages/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class SubjectService {
    loginSubject = new Subject<[boolean, string | undefined]>()
    // logoutSubject = new Subject<any>()
    constructor(private authService: AuthService) { }
}
