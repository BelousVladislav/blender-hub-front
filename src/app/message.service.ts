import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    messageSubject = new Subject<{ type: string, message: string }>();

    constructor(private message: NzMessageService) {
        this.messageSubject.subscribe(data => this.createMessage(data.type, data.message));
    }

    createMessage(type: string, message: string): void {
        this.message.create(type, message);
    }
}
