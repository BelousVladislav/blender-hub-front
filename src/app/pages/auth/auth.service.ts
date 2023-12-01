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
    userId: number | undefined
    constructor(
        private _http: HttpClient,
        private _router: Router
    ) {
        this.decodedAccessToken()
    }

    public setToken(access_token: string) {
        localStorage.setItem('access_token', access_token);
    }

    public getToken() {
        return localStorage.getItem('access_token');
    }

    public removeToken() {
        this.userId = undefined;
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
        // if (!token) this._router.navigate(['/', 'auth', 'authentication']);
        try {
            let payload = jwt_decode.jwtDecode(this.getToken()!);
            this.userId = Object(payload).user.id;
            return jwt_decode.jwtDecode(this.getToken()!);
        } catch (Error) {
            return null;
        }
    }

    public getUserIdFromToken(): number {
        if (this.getToken()) {
            let payload = jwt_decode.jwtDecode(this.getToken()!);
            return Object(payload).user.id || 0;
        } else {
            return 0;
        }

    }


}

