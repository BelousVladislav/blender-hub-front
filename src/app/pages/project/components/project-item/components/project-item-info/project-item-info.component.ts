import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IProject } from '../../../../project.service';
import { environment } from '../../../../../../../environments/environment.prod';
import { IRender, RenderService } from '../../../../render.service';
import { saveAs } from 'file-saver';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommentService, IComment, ICreateCommentDto } from '../../../comment.service';
import { MessageService } from '../../../../../../message.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-project-item-info',
    templateUrl: './project-item-info.component.html',
    styleUrls: ['./project-item-info.component.sass']
})
export class ProjectItemInfoComponent implements OnInit {
    @Input() project: IProject | undefined;
    @Input() myUserId: number | undefined;
    renders: IRender[] = [];
    selectedPhoto: string | undefined;
    photos: string[] = [];
    lastRender: IRender | undefined;
    comment: string = '';
    comments: IComment[] = [];
    isLoadingRenders = false;
    isLoadingComments: boolean = false;
    isSendCommentLoading: boolean = false;
    likeCounter: number = 0;

    constructor(
        private renderService: RenderService,
        private msg: NzMessageService,
        private commentService: CommentService,
        private messageService: MessageService,
        private rout: Router
    ) {
    }

    selectPhoto(photo: string) {
        this.selectedPhoto = photo;
    }

    ngOnInit(): void {
        if (this.project) {
            this.getRenders();
            this.loadComments(this.project.id);
        }
    }

    getRenders() {
        this.isLoadingRenders = true;
        this.renderService.findByProjectId(this.project!.id).subscribe({
            next: (renders: IRender[]) => {
                this.renders = renders;
                this.renders = this.renders.filter(render => render.statusId === 3).sort((a, b) => b.id - a.id);
                this.lastRender = this.renders[0];
                this.photos = this.renders.map(render => environment.apiKey.replace('api/', '') + '/' + render.outFileUUIDName);
                this.selectedPhoto = this.photos[0];
            },
            error: (err: any) => {
                console.log(err)
                let message = err.error.message;
                this.messageService.createMessage('error', `${message ? message : 'Виникла невідома помилка'}`);
                this.isLoadingRenders = false;
            },
            complete: () => {
                this.isLoadingRenders = false;
            }
        });
    }

    async downloadFile(uuidFileName: string, originalFileName: string) {
        this.renderService.downloadFile(uuidFileName).subscribe({
            next: (buffer) => {
                const data: Blob = new Blob([buffer], {
                    type: "text/csv;charset=utf-8"
                });
                saveAs(data, originalFileName);
            },
            error: (error) => {
                console.log(error)
                this.msg.error('Виникла помилка при скачуванні файлу. Спробуйте ще раз.');
            },
            complete: () => {
            }
        })
    }

    loadComments(projectId: number) {
        this.isLoadingComments = true;
        this.commentService.findByProjectId(projectId).subscribe({
            next: (comments: IComment[]) => {
                this.comments = comments;
            },
            error: (err) => {
                console.log(err);
                this.isLoadingComments = false;
                let message = err.error.message;
                this.messageService.createMessage('error', `${message ? message : 'Виникла невідома помилка'}`);
            },
            complete: () => {
                this.isLoadingComments = false;
            }
        });
    }

    sendComment() {
        this.isSendCommentLoading = true;
        if (!this.project || !this.myUserId || !this.comment)
            return;
        let comment: ICreateCommentDto = {
            description: this.comment,
            projectId: this.project!.id,
            userId: this.myUserId!
        };
        this.commentService.create(comment).subscribe({
            next: (comment: IComment) => {
                this.comment = '';
                this.loadComments(this.project!.id);
            },
            error: (err) => {
                console.log(err);
                this.isSendCommentLoading = false;
                let message = err.error.message;
                this.messageService.createMessage('error', `${message ? message : 'Виникла невідома помилка'}`);
            },
            complete: () => {
                this.isSendCommentLoading = false;
            }
        });
    }

    deleteComment(commentId: number) {
        this.commentService.delete(commentId).subscribe({
            next: () => {
                this.loadComments(this.project!.id);
            },
            error: (err) => {
                console.log(err);
                let message = err.error.message;
                this.messageService.createMessage('error', `${message ? message : 'Виникла невідома помилка'}`);
            }
        })
    }

    getStaticFile(fileName: string) {
        let apiKeyStatic = environment.apiKey.replace('api/', '');
        return `${apiKeyStatic}${fileName}`
    }

    onLoginClick(login: string) {
        this.rout.navigate(['/', 'projects'], { queryParams: { search: login } });
    }

    addLike() {
        if (this.likeCounter === 0)
            this.likeCounter = this.likeCounter + 1
        else
            this.likeCounter = this.likeCounter - 1
    }
}
