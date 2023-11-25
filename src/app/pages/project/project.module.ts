import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectComponent } from './project.component';
import { ProjectService } from './project.service';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { RenderService } from './render.service';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ProjectItemInfoComponent } from './components/project-item/components/project-item-info/project-item-info.component';
import { ProjectItemRenderComponent } from './components/project-item/components/project-item-render/project-item-render.component';
import { ProjectItemSettingComponent } from './components/project-item/components/project-item-setting/project-item-setting.component';

@NgModule({
    declarations: [ProjectComponent, ProjectItemComponent, ProjectListComponent, CreateProjectComponent, ProjectItemInfoComponent, ProjectItemRenderComponent, ProjectItemSettingComponent],
    imports: [
        CommonModule,
        ProjectRoutingModule,
        NzNotificationModule,
        NzTableModule,
        NzBadgeModule,
        NzAvatarModule,
        NzListModule,
        NzIconModule,
        NzCardModule,
        NzGridModule,
        NzTagModule,
        NzButtonModule,
        NzInputModule,
        NzSpaceModule,
        FormsModule,
        NzPaginationModule,
        ReactiveFormsModule,
        NzSelectModule,
        NzTabsModule,
        NzUploadModule,
        NzListModule,
        NzDescriptionsModule,
        NzProgressModule,
        NzDividerModule,
        NzImageModule,
        NzModalModule,
        NzPopconfirmModule
    ],
    providers: [ProjectService, RenderService],
    exports: [ProjectListComponent]
})
export class ProjectModule { }
