import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocsRoutingModule } from './docs-routing.module';
import { WhyFreeblenderComponent } from './components/why-freeblender/why-freeblender.component';
import { GettingStartedComponent } from './components/getting-started/getting-started.component';
import { HowBecomeClientComponent } from './components/how-become-client/how-become-client.component';
import { HowBecomeWorkerComponent } from './components/how-become-worker/how-become-worker.component';
import { DocsService } from './docs.service';


@NgModule({
    declarations: [
        WhyFreeblenderComponent,
        GettingStartedComponent,
        HowBecomeClientComponent,
        HowBecomeWorkerComponent
    ],
    imports: [
        CommonModule,
        DocsRoutingModule
    ],
    providers: [DocsService]
})
export class DocsModule { }
