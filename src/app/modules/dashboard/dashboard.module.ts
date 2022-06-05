import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { CardComponent } from './components/card/card.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { MapComponent } from './components/map/map.component';
import { MapService } from './services/map.service';
import { DriverInfoComponent } from './components/driver-info/driver-info.component';
import { PaymentManageComponent } from './components/payment-manage/payment-manage.component';
import { PaymentSelectComponent } from './components/payment-select/payment-select.component';
import { PaymentService } from './services/payment.service';
import { HttpClientModule } from '@angular/common/http';
import { TripService } from './services/trip.service';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { InputModule } from 'src/app/shared/components/input/input.module';
import { DataRecordModule } from 'src/app/shared/components/data-record/data-record.module';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AddressInputModule } from 'src/app/shared/components/address-input/address-input.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DashboardLayoutComponent,
        children: [
          { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
          { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
          { path: 'stats', component: StatsPageComponent, canActivate: [AuthGuard] },
          { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
        ],
      },
    ]),
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY,
      libraries: ['places'],
    }),
    CommonModule,
    ReactiveFormsModule,
    AddressInputModule,
    ButtonModule,
    DataRecordModule,
    InputModule,
    TableModule,
    HttpClientModule,
  ],
  declarations: [
    HomePageComponent,
    StatsPageComponent,
    ProfilePageComponent,
    CardComponent,
    MapComponent,
    DriverInfoComponent,
    PaymentManageComponent,
    PaymentSelectComponent,
    AccountInfoComponent,
    DashboardLayoutComponent,
    HeaderComponent,
    NavbarComponent,
  ],
  exports: [RouterModule],
  providers: [MapService, PaymentService, TripService],
})
export class DashboardModule {}
