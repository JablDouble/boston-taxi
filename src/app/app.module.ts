import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LOADER_INTERCEPTOR_PROVIDER } from './common/interceptors/loader-interceptors.service';
import { GLOBAL_ERROR_HANDLER_PROVIDER } from './common/errors/global-error-handler';
import { NotifierModule } from 'angular-notifier';
import { customNotifierOptions } from './notifier-options';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    LOADER_INTERCEPTOR_PROVIDER,
    GLOBAL_ERROR_HANDLER_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
