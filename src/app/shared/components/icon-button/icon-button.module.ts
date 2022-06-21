import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IconButtonComponent } from './icon-button.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [IconButtonComponent],
  exports: [IconButtonComponent],
})
export class IconButtonModule {}
