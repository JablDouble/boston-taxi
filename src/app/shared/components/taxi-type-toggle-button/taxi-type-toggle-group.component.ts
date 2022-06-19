import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-taxi-type-toggle-group',
  templateUrl: './taxi-type-toggle-group.component.html',
  styleUrls: ['./taxi-type-toggle-group.component.scss'],
})
export class TaxiTypeToggleGroupComponent implements OnInit {
  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onChangeType(value: string) {
    this.change.emit(value);
  }
}
