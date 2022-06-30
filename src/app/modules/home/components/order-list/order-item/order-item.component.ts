import { Component, Input } from '@angular/core';
import { Trip } from 'src/app/data/schema/trip';
import { TripService } from 'src/app/core/services/trip.service';
import { FormatterService } from 'src/app/core/services/formatter.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent {
  @Input() trip: Trip;

  @Input() index: number;

  constructor(public tripService: TripService, public formatterService: FormatterService) {}
}
