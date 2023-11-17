import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IUser {
    id: number;
    userName: string;
    email: string;
    password: string;
    client_uuid: string;
    worker_uuid: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface ICreateUserDto {
    userName: string;
    email: number;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private _http: HttpClient
    ) { }

    public create(createUserDto: ICreateUserDto): Observable<IUser> {
        return this._http.post<IUser>(`${environment.apiKey}user`, createUserDto);
    }
}
