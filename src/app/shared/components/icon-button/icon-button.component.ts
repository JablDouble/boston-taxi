import { Component, Input, OnInit } from '@angular/core';
import { ElementSize } from '../../types';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent implements OnInit {
  @Input() size: ElementSize = 'small';

  @Input() img: string;

  constructor() {}

  ngOnInit(): void {}
}
