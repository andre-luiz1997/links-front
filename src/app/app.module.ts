import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { TemplateComponent } from './template/template.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './pages/auth/interceptors/auth.interceptor';
import { RefreshJwtInterceptor } from './pages/auth/interceptors/refresh-jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshJwtInterceptor
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
