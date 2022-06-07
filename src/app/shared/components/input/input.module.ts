import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [InputComponent],
  exports: [InputComponent],
})
export class InputModule {}
