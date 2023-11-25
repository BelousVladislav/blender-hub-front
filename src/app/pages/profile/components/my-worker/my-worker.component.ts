import { Component, OnInit } from '@angular/core';
import { ProfileService, IWorker } from '../../profile.service';
import { MessageService } from 'src/app/message.service';

@Component({
    selector: 'app-my-worker',
    templateUrl: './my-worker.component.html',
    styleUrls: ['./my-worker.component.sass']
})
export class MyWorkerComponent implements OnInit {
    workers: IWorker[] = [];
    isWorkersLoading: boolean = false;
    constructor(
        private profileService: ProfileService,
        private messageService: MessageService,
    ) { }

    ngOnInit(): void {
        this.getMyWorkers();
    }

    getMyWorkers() {
        this.isWorkersLoading = true;
        this.profileService.findMy().subscribe({
            next: (workers: IWorker[]) => {
                this.workers = workers;
            }, error: (err: any) => {
                let message = err.error.message;
                this.messageService.createMessage('error', `${message ? message : 'Виникла невідома помилка'}`);
                this.isWorkersLoading = false;
            },
            complete: () => {
                this.isWorkersLoading = false;
            }
        })
    }
}
