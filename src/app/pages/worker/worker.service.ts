import { Injectable } from '@angular/core';
import { IUser } from '../user/user.service';

export interface IWorker {
    id: string;
    blenderVersion: number;
    os: string;
    gpuName: string;
    donate: string;
    user: IUser;
    userId: number;
    isOnline: boolean;
    currSocketId: string;
    // renders: IRender[]; //TODO: edit
    createdAt: Date;
    updatedAt: Date;
}

// export interface IRender {
//     id: number;
//     project: IProject;
//     projectId: number;
//     inFileOriginalName: string;
//     inFileUUIDName: string;
//     inFilePath: string;
//     status: IStatus;
//     statusId: number;
//     worker: Worker;
//     workerId: string;
//     progress: number;
//     message: string;
//     outFileOriginalName: string;
//     outFileUUIDName: string;
//     outFilePath: string
//     createdAt: Date;
//     updatedAt: Date;
// }
@Injectable({
    providedIn: 'root'
})
export class WorkerService {

    constructor() { }
}