import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { MyProjectsComponent } from './components/my-projects/my-projects.component';
import { MyWorkerComponent } from './components/my-worker/my-worker.component';
import { MyDataComponent } from './components/my-data/my-data.component';
import { ProfileService } from './profile.service';
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
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProjectModule } from '../project/project.module';

@NgModule({
    declarations: [
        MyProjectsComponent,
        MyWorkerComponent,
        MyDataComponent,
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        NzButtonModule,
        NzCardModule,
        NzDescriptionsModule,
        NzSpaceModule,
        NzFormModule,
        FormsModule,
        ReactiveFormsModule,
        NzInputModule,
        NzNotificationModule,
        NzTableModule,
        NzBadgeModule,
        NzAvatarModule,
        NzListModule,
        NzIconModule,
        ProjectModule
    ],
    providers: [ProfileService]
})
export class ProfileModule { }
