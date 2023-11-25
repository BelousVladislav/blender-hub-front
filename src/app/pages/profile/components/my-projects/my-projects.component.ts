import { Component, OnInit } from '@angular/core';
import { IProject, ProjectService } from '../../../project/project.service';
import { MessageService } from '../../../../message.service';

@Component({
    selector: 'app-my-projects',
    templateUrl: './my-projects.component.html',
    styleUrls: ['./my-projects.component.sass']
})
export class MyProjectsComponent implements OnInit {
    constructor() { }

    ngOnInit(): void {

    }
}
