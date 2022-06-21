import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-record',
  templateUrl: './data-record.component.html',
  styleUrls: ['./data-record.component.scss'],
})
export class DataRecordComponent {
  @Input() title: string = '';

  @Input() text: string = '';

  @Input() img: string;
}
