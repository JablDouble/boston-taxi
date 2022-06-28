import { Component, Input } from '@angular/core';
import { ButtonColor, ButtonType } from '../../types';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() color: ButtonColor = 'success';

  @Input() isDisabled: boolean = false;

  @Input() type: ButtonType = 'button';
}
