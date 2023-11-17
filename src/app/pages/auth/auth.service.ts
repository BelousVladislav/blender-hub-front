import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateUserDto, IUser } from '../user/user.service';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    loginSubject = new Subject<boolean>()
    constructor(
        private _http: HttpClient
    ) { }

    public setToken(access_token: string) {
        localStorage.setItem('access_token', access_token);
    }

    public getToken() {
        return localStorage.getItem('access_token');
    }

    public gremoveToken() {
        return localStorage.removeItem('access_token');
    }

    public register(createUserDto: ICreateUserDto): Observable<IUser> {
        return this._http.post<IUser>(`${environment.apiKey}auth/register`, createUserDto);
    }

    public login(data: { login: string, password: string }): Observable<{ access_token: string }> {
        return this._http.post<{ access_token: string }>(`${environment.apiKey}auth/login`, data);
    }

    public profile(): Observable<any> {
        return this._http.get<any>(`${environment.apiKey}auth/profile`);
    }
}

