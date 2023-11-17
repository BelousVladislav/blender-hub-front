import { Component } from '@angular/core';
import { SubjectService } from './subject.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    isCollapsed = false;
    profileVisible: boolean = true;
    constructor(
        private subjectService: SubjectService
    ) {
        this.subjectService.loginSubject.subscribe(bl => {
            this.profileVisible = !this.profileVisible;
        });
    }
}
