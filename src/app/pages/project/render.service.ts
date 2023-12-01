import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../user/user.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProject } from './project.service';

export interface IRender {
    id: number;
    project: IProject;
    projectId: number;
    inFileOriginalName: string;
    inFileUUIDName: string;
    inFilePath: string;
    status: IStatus;
    statusId: number;
    worker: Worker;
    workerId: string;
    progress: number;
    message: string;
    outFileOriginalName: string;
    outFileUUIDName: string;
    outFilePath: string
    createdAt: Date;
    updatedAt: Date;
}

export interface IStatus {
    id: number;
    name: string;
    renders: IRender[];
    createdAt: Date;
    updatedAt: Date;
}

@Injectable({
    providedIn: 'root'
})
export class RenderService {

    constructor(
        private _http: HttpClient
    ) { }

    // public create(createProjectDto: ICreateProjectDto): Observable<IProject> {
    //     return this._http.post<IProject>(`${environment.apiKey}project`, createProjectDto);
    // }

    // public findAll(): Observable<IProject[]> {
    //     return this._http.get<IProject[]>(`${environment.apiKey}project`);
    // }

    // public findMy(): Observable<IProject[]> {
    //     return this._http.get<IProject[]>(`${environment.apiKey}project/findMy`);
    // }

    // public findByUserId(userId: number): Observable<IProject[]> {
    //     return this._http.get<IProject[]>(`${environment.apiKey}project/findByUserId/${userId}`);
    // }

    public findById(renderId: number): Observable<IRender> {
        return this._http.get<IRender>(`${environment.apiKey}render/${renderId}`);
    }

    public findByProjectId(projectId: number): Observable<IRender[]> {
        return this._http.get<IRender[]>(`${environment.apiKey}render/findByProjectId/${projectId}`);
    }

    public downloadFile(fileName: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/octet-stream' // Установите тип контента в зависимости от вашего API
        });
        return this._http.get(`${environment.apiKey}render/donwloadFile/${fileName}`, { headers: headers, responseType: "blob" });
    }

    // public update(updateProjectDto: IUpdateProjectDto): Observable<IProject> {
    //     return this._http.patch<IProject>(`${environment.apiKey}project`, updateProjectDto);
    // }

    public delete(id: number): Observable<any> {
        return this._http.delete<any>(`${environment.apiKey}render/${id}`);
    }

}
