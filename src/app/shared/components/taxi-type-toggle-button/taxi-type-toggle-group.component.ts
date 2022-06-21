import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-taxi-type-toggle-group',
  templateUrl: './taxi-type-toggle-group.component.html',
  styleUrls: ['./taxi-type-toggle-group.component.scss'],
})
export class TaxiTypeToggleGroupComponent {
  @Output() changeTariff: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  onChangeType(value: string) {
    this.changeTariff.emit(value);
  }
}
