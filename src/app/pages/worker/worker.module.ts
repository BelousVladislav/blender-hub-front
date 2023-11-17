import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkerRoutingModule } from './worker-routing.module';
import { WorkerComponent } from './worker.component';
import { WorkerService } from './worker.service';


@NgModule({
    declarations: [WorkerComponent],
    imports: [
        CommonModule,
        WorkerRoutingModule
    ],
    providers: [WorkerService]
})
export class WorkerModule { }
