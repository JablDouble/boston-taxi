import { Component, Input } from '@angular/core';
import { ElementSize } from '../../types';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent {
  @Input() size: ElementSize = 'small';

  @Input() img: string;
}
