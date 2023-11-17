import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { MyProjectsComponent } from './components/my-projects/my-projects.component';
import { MyWorkerComponent } from './components/my-worker/my-worker.component';
import { MyDataComponent } from './components/my-data/my-data.component';
import { ProfileService } from './profile.service';


@NgModule({
    declarations: [
        MyProjectsComponent,
        MyWorkerComponent,
        MyDataComponent
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule
    ],
    providers: [ProfileService]
})
export class ProfileModule { }
