import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
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

  @Input() errors: ValidationErrors | null | undefined;

  addresses: Address[] = [];

  isOpenAddressesList: boolean = false;

  control = new FormControl();

  onChange: (value: Address) => void;

  onTouch: () => void;

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

  writeValue(value: Address): void {
    this.control.setValue(value?.label);
  }

  registerOnChange(fn: (value: Address) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
}
