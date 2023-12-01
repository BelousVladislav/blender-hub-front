import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { ActivatedRoute } from '@angular/router';
import { IRender, RenderService } from '../../../../render.service';
import { environment } from 'src/environments/environment';
import { ProjectService, IProject } from '../../../../project.service';
import { MessageService } from '../../../../../../message.service';
import { saveAs } from "file-saver";

@Component({
    selector: 'app-project-item-render',
    templateUrl: './project-item-render.component.html',
    styleUrls: ['./project-item-render.component.sass']
})
export class ProjectItemRenderComponent implements OnInit, OnDestroy {
    @Input() project: IProject | undefined;
    @Input() myUserId: number | undefined;
    renders: IRender[] = [];
    blendFileList: NzUploadFile[] = [];
    isLoadingFile = false;
    isLoadingRenders = false;
    isLoadingDeleteRender = false;
    isRenderModalVisible: boolean = false;
    delayedRenders: number[] = [];

    constructor(
        private msg: NzMessageService,
        private projectService: ProjectService,
        private messageService: MessageService,
        private renderService: RenderService,
    ) { }

    async ngOnInit() {
        this.getRenders();
    }
    async ngOnDestroy() {
        this.delayedRenders = [];
    }

    async checkNoFinishRenders() {
        let noFinishRenders = this.renders.filter(render => render.statusId !== 3 && render.statusId !== 4);
        noFinishRenders.forEach(nofRender => {
            console.log(`No finish render: ${nofRender.id}`);
            // this.delayedRenders.includes(renderId)
            if (!this.delayedRenders.includes(nofRender.id)) {
                this.delayedRenders.push(nofRender.id);
                this.delayedFunction(nofRender.id);
            }
        })
    }

    beforeUpload = (file: NzUploadFile): boolean => {
        this.blendFileList.length = 0;
        let fileType = file.name.substring(file.name.lastIndexOf('.'));
        if (!(fileType == '.blend' || fileType == '.rar')) {
            this.msg.error('Тип файлу повинен бути .blend або .rar');
            return false;
        }
        this.blendFileList = this.blendFileList.concat(file);
        return false;
    };

    async sendBlenderFileForRender() {
        if (this.blendFileList.length !== 1) return;
        this.isLoadingFile = true;
        this.projectService.sendBlenderFileForRender(this.project!.id, this.blendFileList[0]).subscribe({
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
        this.renderService.findByProjectId(this.project!.id).subscribe({
            next: (renders: IRender[]) => {
                this.renders = renders;
                this.checkNoFinishRenders();
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

    getStaticFile(fileName: string) {
        let apiKeyStatic = environment.apiKey.replace('api/', '');
        return `${apiKeyStatic}${fileName}`
    }

    async downloadFile(uuidFileName: string, originalFileName: string) {
        this.renderService.downloadFile(uuidFileName).subscribe({
            next: (buffer) => {
                const data: Blob = new Blob([buffer], {
                    // type: 'application/octet-stream'
                });
                // const url = window.URL.createObjectURL(data);
                // const a = document.createElement('a');
                // a.href = url;
                // a.download = 'file.blend'; // Установите имя файла
                // document.body.appendChild(a);
                // a.click();
                // document.body.removeChild(a);
                // window.URL.revokeObjectURL(url);
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
        console.log(`delayed ${renderId}`)
        if (!this.delayedRenders.includes(renderId))
            return;
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
