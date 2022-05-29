import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MapService } from 'src/app/dashboard/services/map.service';
import { Address } from '../../interfaces';

@Component({
  selector: 'app-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.scss']
})
export class AddressInputComponent implements OnInit {

  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() value: string = '';
  @Input() iconUrl: string;

  @Output() onChangeAddress: EventEmitter<Address> = new EventEmitter();

  addresses: Address[] = [];
  @Input('value') addressSearch: string = '';
  selectedAddress: Address;
  isOpenAddressesList: boolean = false;

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
  }

  searchAddress() {
    if (this.addressSearch && this.addressSearch.length > 2) {
      this.mapService.getPositionByStreetName(this.addressSearch).subscribe((addresses: Address[]) => {
        this.addresses = addresses;
      });
    }
  }

  selectAddress(selectedAddress: Address) {
    if (selectedAddress) {
      this.selectedAddress = selectedAddress;
      this.isOpenAddressesList = false;
      this.addressSearch = selectedAddress.label;
      this.onChangeAddress.emit(selectedAddress);
    }
  }

}
