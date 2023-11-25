import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkerRoutingModule } from './worker-routing.module';
import { WorkerComponent } from './worker.component';
import { WorkerService } from './worker.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { ProfileService } from '../profile/profile.service';


@NgModule({
    declarations: [WorkerComponent],
    imports: [
        CommonModule,
        WorkerRoutingModule,
        NzButtonModule,
        NzCardModule,
        NzDescriptionsModule,
        NzSpaceModule,
        NzFormModule,
        FormsModule,
        NzInputModule,
        NzNotificationModule,
        NzTableModule,
        NzBadgeModule,
    ],
    providers: [WorkerService, ProfileService]
})
export class WorkerModule { }
