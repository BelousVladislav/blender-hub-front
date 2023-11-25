import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IUser {
    id: number;
    login: string;
    email: string;
    password: string;
    client_uuid: string;
    worker_uuid: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface ICreateUserDto {
    login: string;
    email: string;
    password?: string;
}

export interface IUpdateUserDto extends ICreateUserDto {
    id: number;
    client_uuid: string;
    worker_uuid: string;
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

    public findAll(): Observable<IUser[]> {
        return this._http.get<IUser[]>(`${environment.apiKey}user`);
    }

    public findById(id: number): Observable<IUser> {
        return this._http.get<IUser>(`${environment.apiKey}user/${id}`);
    }

    public update(updateUserDto: IUpdateUserDto): Observable<IUser> {
        return this._http.patch<IUser>(`${environment.apiKey}user`, updateUserDto);
    }

    public remove(id: number): Observable<any> {
        return this._http.delete<any>(`${environment.apiKey}user/${id}`);
    }
}
