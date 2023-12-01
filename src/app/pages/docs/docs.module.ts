import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocsRoutingModule } from './docs-routing.module';
import { WhyFreeblenderComponent } from './components/why-freeblender/why-freeblender.component';
import { GettingStartedComponent } from './components/getting-started/getting-started.component';
import { HowBecomeClientComponent } from './components/how-become-client/how-become-client.component';
import { HowBecomeWorkerComponent } from './components/how-become-worker/how-become-worker.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzImageModule } from 'ng-zorro-antd/image';
import { DocsService } from './docs.service';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';


@NgModule({
    declarations: [
        WhyFreeblenderComponent,
        GettingStartedComponent,
        HowBecomeClientComponent,
        HowBecomeWorkerComponent
    ],
    imports: [
        CommonModule,
        DocsRoutingModule,
        NzTypographyModule,
        NzGridModule,
        NzCardModule,
        NzDividerModule,
        NzAlertModule,
        NzImageModule,
        NzAnchorModule
    ],
    providers: [DocsService]
})
export class DocsModule { }
