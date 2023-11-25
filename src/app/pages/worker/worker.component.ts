import { Component } from '@angular/core';
import { ProfileService, IWorker } from '../profile/profile.service';
import { MessageService } from 'src/app/message.service';

@Component({
    selector: 'app-worker',
    templateUrl: './worker.component.html',
    styleUrls: ['./worker.component.sass']
})
export class WorkerComponent {
    workers: IWorker[] = [];
    isWorkersLoading: boolean = false;
    constructor(
        private profileService: ProfileService,
        private messageService: MessageService,
    ) { }

    ngOnInit(): void {
        this.getWorkers();
    }

    getWorkers() {
        this.isWorkersLoading = true;
        this.profileService.findAll().subscribe({
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
