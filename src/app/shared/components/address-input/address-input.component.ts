import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { MapService } from 'src/app/core/services/map.service';
import { Address } from '../../types';

@Component({
  selector: 'app-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.scss'],
})
export class AddressInputComponent {
  @Input() placeholder: string = '';

  @Input() type: string = 'text';

  @Input() iconUrl: string;

  @Output() changeAddress: EventEmitter<Address> = new EventEmitter();

  addresses: Address[] = [];

  @Input() value: string = '';

  @Input() errors?: ValidationErrors | null | undefined;

  selectedAddress: Address;

  isOpenAddressesList: boolean = false;

  control = new FormControl();

  constructor(private mapService: MapService) {}

  searchAddress() {
    if (this.value && this.value.length > 2) {
      this.mapService.getPositionByStreetName(this.value).subscribe((addresses: Address[]) => {
        this.addresses = addresses;
      });
    }
  }

  selectAddress(selectedAddress: Address) {
    if (selectedAddress) {
      this.selectedAddress = selectedAddress;
      this.isOpenAddressesList = false;
      this.value = selectedAddress.label;
      this.changeAddress.emit(selectedAddress);
    }
  }
}
