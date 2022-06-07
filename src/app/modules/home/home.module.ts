import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { MapModule } from 'src/app/shared/components/map/map.module';
import { AddressInputModule } from 'src/app/shared/components/address-input/address-input.module';
import { PaymentSelectModule } from 'src/app/shared/components/payment-select/payment-select.module';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { DriverInfoComponent } from './components/driver-info/driver-info.component';
import { DataRecordModule } from 'src/app/shared/components/data-record/data-record.module';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  declarations: [HomePageComponent, DriverInfoComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: HomePageComponent, canActivate: [AuthGuard] }]),
    CommonModule,
    MapModule,
    AddressInputModule,
    PaymentSelectModule,
    CardModule,
    DataRecordModule,
  ],
  exports: [RouterModule],
})
export class HomeModule {}
