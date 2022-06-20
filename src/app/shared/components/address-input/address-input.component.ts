import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MapService } from 'src/app/core/services/map.service';
import { Address } from '../../types';

@Component({
  selector: 'app-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressInputComponent),
      multi: true,
    },
  ],
})
export class AddressInputComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';

  @Input() type: string = 'text';

  @Input() iconUrl: string;

  @Input() errors: any;

  addresses: Address[] = [];

  isOpenAddressesList: boolean = false;

  control = new FormControl();

  onChange: any;

  onTouch: any;

  constructor(private mapService: MapService) {}

  searchAddress() {
    if (this.control.value && this.control.value.length > 2) {
      this.mapService
        .getPositionByStreetName(this.control.value)
        .subscribe((addresses: Address[]) => {
          this.addresses = addresses;
        });
    }
  }

  selectAddress(selectedAddress: Address) {
    if (selectedAddress) {
      this.isOpenAddressesList = false;
      this.control.setValue(selectedAddress.label);
      this.onChange(selectedAddress);
    }
  }

  writeValue(value: any): void {
    this.control.setValue(value?.label);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
