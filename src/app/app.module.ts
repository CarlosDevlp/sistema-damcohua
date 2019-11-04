import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertDialogService } from './services/alert-dialog.service';
import { ModalDialogContentModule } from './layout/components/modal-dialog-content/modal-dialog-content.module';
import { JwtAuthService } from './guard/jwt-auth.service';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { SeguridadService } from './services/seguridad.service';
import { ClientesService } from './services/clientes.service';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        ModalDialogContentModule
    ],
    declarations: [AppComponent],
    providers: [
        JwtAuthService, 
        AlertDialogService,
        SeguridadService,
        ClientesService,
        {
            provide:HTTP_INTERCEPTORS,
            useClass:AuthInterceptorService,
            multi:true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
