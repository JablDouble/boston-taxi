import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardHeaderComponent } from './dashboard/shared/components/dashboard-header/dashboard-header.component';
import { DashboardLayoutComponent } from './dashboard/shared/components/dashboard-layout/dashboard-layout.component';
import { DashboardNavbarComponent } from './dashboard/shared/components/dashboard-navbar/dashboard-navbar.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    DashboardHeaderComponent,
    DashboardNavbarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
