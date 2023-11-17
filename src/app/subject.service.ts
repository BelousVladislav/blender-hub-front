import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SubjectService {
    loginSubject = new Subject<boolean>()
    // logoutSubject = new Subject<any>()
    constructor() { }
}
