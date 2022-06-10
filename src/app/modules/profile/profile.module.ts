import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { MapModule } from 'src/app/shared/components/map/map.module';
import { PaymentSelectModule } from 'src/app/shared/components/payment-select/payment-select.module';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { AddressInputModule } from 'src/app/shared/components/address-input/address-input.module';
import { PaymentManageComponent } from './components/payment-manage/payment-manage.component';
import { InputModule } from 'src/app/shared/components/input/input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DataRecordModule } from 'src/app/shared/components/data-record/data-record.module';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { CardSectionComponent } from './components/card-section/card-section.component';

@NgModule({
  declarations: [
    ProfilePageComponent,
    AccountInfoComponent,
    PaymentManageComponent,
    CardSectionComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: '', component: ProfilePageComponent, canActivate: [AuthGuard] },
    ]),
    CommonModule,
    MapModule,
    PaymentSelectModule,
    CardModule,
    ButtonModule,
    AddressInputModule,
    InputModule,
    ReactiveFormsModule,
    DataRecordModule,
  ],
  exports: [RouterModule],
})
export class ProfileModule {}
