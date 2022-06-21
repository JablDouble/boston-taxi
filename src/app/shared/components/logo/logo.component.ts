import { Component, Input } from '@angular/core';
import { ElementSize } from '../../types';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
  @Input() size: ElementSize = 'small';
}
