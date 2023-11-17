import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { uk_UA } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import uk from '@angular/common/locales/uk';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { AuthModule } from './pages/auth/auth.module';
import { DocsModule } from './pages/docs/docs.module';
import { ProfileModule } from './pages/profile/profile.module';
import { ProjectModule } from './pages/project/project.module';
import { WorkerModule } from './pages/worker/worker.module';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { UserModule } from './pages/user/user.module';
import { TokenInterceptor } from './pages/auth/token.interceptor';
import { SubjectService } from './subject.service';

registerLocaleData(uk);

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        IconsProviderModule,
        NzLayoutModule,
        NzMenuModule,
        NzGridModule,
        AuthModule,
        DocsModule,
        ProfileModule,
        ProjectModule,
        WorkerModule,
        NzMessageModule,
        UserModule
    ],
    providers: [
        { provide: NZ_I18N, useValue: uk_UA },
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: TokenInterceptor
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
