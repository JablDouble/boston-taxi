import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-taxi-type-toggle-button',
  templateUrl: './taxi-type-toggle-button.component.html',
  styleUrls: ['./taxi-type-toggle-button.component.scss'],
})
export class TaxiTypeToggleButtonComponent implements OnInit {
  @Input() name: string;

  @Input() price: number;

  @Input() img: string;

  constructor() {}

  ngOnInit(): void {}
}
