import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-manage',
  templateUrl: './payment-manage.component.html',
  styleUrls: ['./payment-manage.component.scss'],
})
export class PaymentManageComponent {
  isAddCardSectionShown: boolean = false;

  showCardBlockSection() {
    this.isAddCardSectionShown = true;
  }

  hideCardBlockSection() {
    this.isAddCardSectionShown = false;
  }
}
