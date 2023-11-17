import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { ProjectService } from './project.service';


@NgModule({
    declarations: [ProjectComponent],
    imports: [
        CommonModule,
        ProjectRoutingModule
    ],
    providers: [ProjectService]
})
export class ProjectModule { }
