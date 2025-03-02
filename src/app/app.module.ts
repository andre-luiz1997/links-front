import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { TemplateComponent } from './template/template.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './pages/auth/interceptors/auth.interceptor';
import { RefreshJwtInterceptor } from './pages/auth/interceptors/refresh-jwt.interceptor';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Socket, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment.development';
import { Injectable, NgModule } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { definePreset } from '@primeng/themes';

@Injectable()
export class AuthSocket extends Socket {
    constructor() {
        super({
            url: environment.SERVER_URL,
            options: {
                path: '/auth-socket',
                autoConnect: false,
            },
        });
    }
}

@NgModule({
    declarations: [
        AppComponent,
        TemplateComponent,
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        ToastModule,
        SocketIoModule,
    ],
    providers: [
        MessageService,
        AuthSocket,
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                options: {
                    darkModeSelector: false || 'none'
                },
                preset: definePreset(Aura, {
                    semantic: {
                        primary: {
                            "50": "#f8fff3",
                            "100": "#eefee5",
                            "200": "#dcfcc9",
                            "300": "#cbf9ae",
                            "400": "#baf792",
                            "500": "#c1fba4",
                            "600": "#8cc26f",
                            "700": "#648c50",
                            "800": "#3c5732",
                            "900": "#172616",
                            "950": "#0b130b"
                        }
                    }
                })
            }
        }),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RefreshJwtInterceptor,
            multi: true
        },
        provideHttpClient(withInterceptorsFromDi()),
    ]
})
export class AppModule { }
