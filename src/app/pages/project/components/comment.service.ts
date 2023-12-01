import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../../user/user.service';

export interface IComment {
    id: number;
    description: string;
    project: IComment;
    projectId: number;
    user: IUser;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateCommentDto {
    description: string;
    projectId: number;
    userId: number;
}

export interface IUpdateCommentDto extends ICreateCommentDto {
    id: number;
}

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(
        private _http: HttpClient
    ) { }

    public create(createCommentDto: ICreateCommentDto): Observable<IComment> {
        return this._http.post<IComment>(`${environment.apiKey}comment`, createCommentDto);
    }

    public findAll(): Observable<IComment[]> {
        return this._http.get<IComment[]>(`${environment.apiKey}comment`);
    }

    public findByProjectId(projectId: number): Observable<IComment[]> {
        return this._http.get<IComment[]>(`${environment.apiKey}comment/findByProjectId/${projectId}`);
    }

    public delete(id: number): Observable<any> {
        return this._http.delete<any>(`${environment.apiKey}comment/${id}`);
    }
}
