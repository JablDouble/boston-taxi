import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataRecordComponent } from './data-record.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DataRecordComponent],
  exports: [DataRecordComponent],
})
export class DataRecordModule {}
