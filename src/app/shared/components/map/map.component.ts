import { Component, Input } from '@angular/core';
import { Address, Coordinate } from 'src/app/shared/types';
import { MapService } from '../../../core/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  @Input() startAddress: Address | null;

  @Input() endAddress: Address | null;

  @Input() taxiPoint: Coordinate | null;

  zoom: number = 17;

  maxZoom: number = 17;

  iconTaxi = {
    url: 'https://flomaster.club/uploads/posts/2021-11/thumbs/1635854509_54-flomaster-club-p-narisovannaya-mashina-sverkhu-krasivii-ris-74.png',
    scaledSize: {
      width: 70,
      height: 35,
    },
  };

  constructor(public mapService: MapService) {}
}
