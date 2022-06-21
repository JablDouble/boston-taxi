import { Component, Input } from '@angular/core';
import { ButtonType } from '../../types';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() success: boolean = true;

  @Input() isDisabled: boolean = false;

  @Input() type: ButtonType = 'button';
}
