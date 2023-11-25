import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateUserDto, IUser } from '../user/user.service';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private _http: HttpClient,
        private _router: Router
    ) { }

    public setToken(access_token: string) {
        localStorage.setItem('access_token', access_token);
    }

    public getToken() {
        return localStorage.getItem('access_token');
    }

    public removeToken() {
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

    public decodedAccessToken(): any {
        let token = this.getToken();
        if (!token) this._router.navigate(['/', 'auth', 'authentication']);
        try {
            return jwt_decode.jwtDecode(this.getToken()!);
        } catch (Error) {
            return null;
        }
    }
}

