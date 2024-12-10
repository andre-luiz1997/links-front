import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { TemplateComponent } from './template/template.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './pages/auth/interceptors/auth.interceptor';
import { RefreshJwtInterceptor } from './pages/auth/interceptors/refresh-jwt.interceptor';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Socket, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class AuthSocket extends Socket {
	constructor() {
		super({
			url: environment.SERVER_URL,
			options: {
				path: '/auth',
				autoConnect: false,
			},
		});
	}
}

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    ToastModule,
    HttpClientModule,
    SocketIoModule
  ],
  providers: [
    MessageService,
    AuthSocket,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
