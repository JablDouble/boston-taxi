import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TaxiTypeToggleButtonComponent } from './taxi-type-toggle-button/taxi-type-toggle-button.component';
import { TaxiTypeToggleGroupComponent } from './taxi-type-toggle-group.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatButtonToggleModule],
  declarations: [TaxiTypeToggleGroupComponent, TaxiTypeToggleButtonComponent],
  exports: [TaxiTypeToggleGroupComponent],
})
export class TaxiTypeToggleGroupModule {}
