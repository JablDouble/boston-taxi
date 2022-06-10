import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MapService } from 'src/app/core/services/map.service';
import { Address } from '../../types';

@Component({
  selector: 'app-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.scss'],
})
export class AddressInputComponent implements OnInit {
  @Input() placeholder: string = '';

  @Input() type: string = 'text';

  @Input() iconUrl: string;

  @Output() onChangeAddress: EventEmitter<Address> = new EventEmitter();

  addresses: Address[] = [];

  @Input() value: string = '';

  selectedAddress: Address;

  isOpenAddressesList: boolean = false;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {}

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
      this.onChangeAddress.emit(selectedAddress);
    }
  }
}
