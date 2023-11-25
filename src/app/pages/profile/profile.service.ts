import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../user/user.service';

export interface IWorker {
    id: string
    blenderVersion: number;
    os: string;
    gpuName: string;
    donate: string;
    userId: number;
    isOnline: boolean;
    currSocketId: string;
    createdAt: Date;
    updatedAt: Date;
    user?: IUser;
}

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(
        private _http: HttpClient
    ) { }

    public findAll(): Observable<IWorker[]> {
        return this._http.get<IWorker[]>(`${environment.apiKey}worker`);
    }

    public findById(workerId: string): Observable<IWorker> {
        return this._http.get<IWorker>(`${environment.apiKey}worker/${workerId}`);
    }

    public findMy(): Observable<IWorker[]> {
        return this._http.get<IWorker[]>(`${environment.apiKey}worker/findMy`);
    }
}
