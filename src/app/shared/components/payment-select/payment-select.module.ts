import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentSelectComponent } from './payment-select.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [PaymentSelectComponent],
  exports: [PaymentSelectComponent],
})
export class PaymentSelectModule {}
