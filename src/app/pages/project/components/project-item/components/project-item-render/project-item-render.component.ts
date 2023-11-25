import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { ActivatedRoute } from '@angular/router';
import { IRender, RenderService } from '../../../../render.service';
import { environment } from 'src/environments/environment';
import { ProjectService } from '../../../../project.service';
import { MessageService } from '../../../../../../message.service';

@Component({
    selector: 'app-project-item-render',
    templateUrl: './project-item-render.component.html',
    styleUrls: ['./project-item-render.component.sass']
})
export class ProjectItemRenderComponent implements OnInit {
    @Input() projectId: number | undefined;
    renders: IRender[] = [];
    blendFileList: NzUploadFile[] = [];
    isLoadingFile = false;
    isLoadingRenders = false;
    isLoadingDeleteRender = false;
    isRenderModalVisible: boolean = false;

    constructor(
        private msg: NzMessageService,
        private projectService: ProjectService,
        private messageService: MessageService,
        private renderService: RenderService,
        private route: ActivatedRoute
    ) { }

    async ngOnInit() {
        this.getRenders();
        // this.renders = await this.getRendersPromise();
        // setTimeout(() => this.getRenders(), 5000);
    }

    beforeUpload = (file: NzUploadFile): boolean => {
        this.blendFileList.length = 0;
        let fileType = file.name.substring(file.name.lastIndexOf('.'));
        if (!(fileType == '.blend' || fileType == '.zip')) {
            this.msg.error('Тип файлу повинен бути .blend або .zip');
            return false;
        }
        this.blendFileList = this.blendFileList.concat(file);
        return false;
    };

    async sendFile() {

    }

    async sendBlenderFileForRender() {
        if (this.blendFileList.length !== 1) return;
        this.isLoadingFile = true;
        this.projectService.sendBlenderFileForRender(1017, this.blendFileList[0]).subscribe({
            next: (render: IRender) => {
                this.msg.success('Файл надіслано! Слідкуйте за виконанням рендерингу.');
                this.delayedFunction(render.id);
            },
            error: (err: any) => {
                console.log(err)
                let message = err.error.message;
                this.messageService.createMessage('error', `${message ? message : 'Виникла невідома помилка'}`);
                this.isLoadingFile = false;
                this.showRenderModal(false)
            },
            complete: () => {
                this.showRenderModal(false)
                this.isLoadingFile = false;
                this.getRenders();
            }
        })
    }

    getRenders() {
        this.isLoadingRenders = true;
        this.renderService.findByProjectId(this.projectId!).subscribe({
            next: (renders: IRender[]) => {
                this.renders = renders;
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

    // getRendersPromise() {
    //     return new Promise<IRender[]>((resolve, reject) => {
    //         this.isLoadingRenders = true;
    //         this.renderService.findByProjectId(this.projectId!).subscribe({
    //             next: (renders: IRender[]) => {
    //                 this.isLoadingRenders = false;
    //                 resolve(renders);
    //             },
    //             error: (err: any) => {
    //                 console.log(err)
    //                 let message = err.error.message;
    //                 this.messageService.createMessage('error', `${message ? message : 'Виникла невідома помилка'}`);
    //                 this.isLoadingRenders = false;
    //                 reject(err)
    //             },
    //             complete: () => {
    //                 this.isLoadingRenders = false;
    //             }
    //         });
    //     })

    // }

    getStaticFile(fileName: string) {
        let apiKeyStatic = environment.apiKey.replace('api/', '');
        return `${apiKeyStatic}${fileName}`
    }

    showRenderModal(show: boolean) {
        this.isRenderModalVisible = show;
        this.blendFileList = [];
    }

    deleteRender(renderId: number) {
        this.isLoadingDeleteRender = true;
        this.renderService.delete(renderId).subscribe({
            next: () => {
                this.messageService.createMessage('success', 'Рендеринг успішно видалено');
                this.getRenders();
            },
            error: (err) => {
                let message = err.error.message;
                this.isLoadingDeleteRender = false;
                this.messageService.createMessage('error', `${message ? message : 'Виникла невідома помилка'}`);
            },
            complete: () => {
                this.isLoadingDeleteRender = false;
            }
        })
    }

    sleep(ms: number) {
        return new Promise(function (resolve) {
            setTimeout(resolve, ms);
        });
    }

    async delayedFunction(renderId: number) {
        let render = await this.renderService.findById(renderId).toPromise();
        let renderFind = this.renders.find(itemR => itemR.id === renderId);
        if (render && renderFind) {
            Object.assign(renderFind, render);
            if (render.statusId === 3 || render.statusId === 4) {
                return;
            } else {
                await this.sleep(3000);
                await this.delayedFunction(renderId);
            }
        }
    }

}
