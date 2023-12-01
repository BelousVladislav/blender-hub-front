import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../user/user.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRender } from './render.service';
import { IComment } from './components/comment.service';

export interface IProject {
    id: number;
    name: string;
    userId: string;
    description: string;
    tags: string;
    uuidToken: string;
    createdAt: Date;
    updatedAt: Date;
    renders: IRender[];
    comments: IComment[];
    user?: IUser;
    tagsArr?: {
        name: string,
        color: string
    }[]
}

export interface ICreateProjectDto {
    name: string;
    description: string;
    tags: string;
    uuidToken?: string
}

export interface IUpdateProjectDto extends ICreateProjectDto {
    id: number;
}

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(
        private _http: HttpClient
    ) { }

    public create(createProjectDto: ICreateProjectDto): Observable<IProject> {
        return this._http.post<IProject>(`${environment.apiKey}project`, createProjectDto);
    }

    public findAll(): Observable<IProject[]> {
        return this._http.get<IProject[]>(`${environment.apiKey}project`);
    }

    public findMy(): Observable<IProject[]> {
        return this._http.get<IProject[]>(`${environment.apiKey}project/findMy`);
    }

    public findByUserId(userId: number): Observable<IProject[]> {
        return this._http.get<IProject[]>(`${environment.apiKey}project/findByUserId/${userId}`);
    }

    public findById(id: number): Observable<IProject> {
        return this._http.get<IProject>(`${environment.apiKey}project/${id}`);
    }

    public update(updateProjectDto: IUpdateProjectDto): Observable<IProject> {
        return this._http.patch<IProject>(`${environment.apiKey}project`, updateProjectDto);
    }

    public delete(id: number): Observable<any> {
        return this._http.delete<any>(`${environment.apiKey}project/${id}`);
    }

    public sendBlenderFileForRender(projectId: number, file: any): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name)
        return this._http.post<any>(`${environment.apiKey}project/uploadBlenderFileForRender/${projectId}`, formData);
    }
}
