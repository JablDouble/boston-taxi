import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-taxi-type-toggle-group',
  templateUrl: './taxi-type-toggle-group.component.html',
  styleUrls: ['./taxi-type-toggle-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TaxiTypeToggleGroupComponent),
      multi: true,
    },
  ],
})
export class TaxiTypeToggleGroupComponent implements ControlValueAccessor {
  control = new FormControl();

  onChange: (value: MatButtonToggleChange) => void;

  onTouch: () => void;

  writeValue(value: string): void {
    this.control.setValue(value);
  }

  registerOnChange(fn: (value: MatButtonToggleChange) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
}
