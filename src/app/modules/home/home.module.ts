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
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { PulseModule } from 'src/app/shared/components/pulse/pulse.module';
import { IconButtonModule } from 'src/app/shared/components/icon-button/icon-button.module';
import { TaxiSearchingScreenComponent } from './components/taxi-searching-screen/taxi-searching-screen.component';
import { OrderTaxiFormComponent } from './components/order-taxi-form/order-taxi-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DelimiterModule } from 'src/app/shared/components/delimiter/delimiter.module';
import { TaxiTypeToggleGroupModule } from 'src/app/shared/components/taxi-type-toggle-button/taxi-type-toggle-group.module';
import { OrderAnotherCarButtonComponent } from './components/order-another-car-button/order-another-car-button.component';

@NgModule({
  declarations: [
    HomePageComponent,
    DriverInfoComponent,
    TaxiSearchingScreenComponent,
    OrderTaxiFormComponent,
    OrderAnotherCarButtonComponent,
  ],
  imports: [
    RouterModule.forChild([{ path: '', component: HomePageComponent, canActivate: [AuthGuard] }]),
    CommonModule,
    MapModule,
    AddressInputModule,
    PaymentSelectModule,
    CardModule,
    DataRecordModule,
    ButtonModule,
    PulseModule,
    DelimiterModule,
    IconButtonModule,
    ReactiveFormsModule,
    TaxiTypeToggleGroupModule,
  ],
  exports: [RouterModule],
})
export class HomeModule {}
