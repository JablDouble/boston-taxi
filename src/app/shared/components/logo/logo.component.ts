import { Component, Input, OnInit } from '@angular/core';
import { ElementSize } from '../../types';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  @Input() size: ElementSize = 'small';

  constructor() {}

  ngOnInit(): void {}
}
