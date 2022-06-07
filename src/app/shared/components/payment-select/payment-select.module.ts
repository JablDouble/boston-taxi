import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaymentSelectComponent } from './payment-select.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PaymentSelectComponent],
  exports: [PaymentSelectComponent],
})
export class PaymentSelectModule {}
