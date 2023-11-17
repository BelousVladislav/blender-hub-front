import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhyFreeblenderComponent } from './components/why-freeblender/why-freeblender.component';
import { GettingStartedComponent } from './components/getting-started/getting-started.component';
import { HowBecomeClientComponent } from './components/how-become-client/how-become-client.component';
import { HowBecomeWorkerComponent } from './components/how-become-worker/how-become-worker.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/docs/whyfb' },
    { path: 'whyfb', component: WhyFreeblenderComponent },
    { path: 'gettingstarted', component: GettingStartedComponent },
    { path: 'howbeclient', component: HowBecomeClientComponent },
    { path: 'howbeworker', component: HowBecomeWorkerComponent },
    { path: '**', redirectTo: '/docs/whyfb' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocsRoutingModule { }

