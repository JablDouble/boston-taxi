import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/core/services/payment.service';
import { CreditCard } from '../../types';

@Component({
  selector: 'app-payment-select',
  templateUrl: './payment-select.component.html',
  styleUrls: ['./payment-select.component.scss'],
})
export class PaymentSelectComponent implements OnInit {
  creditCards: CreditCard[];

  constructor(public paymentService: PaymentService) {}

  ngOnInit(): void {
    this.paymentService.getAllCreditCards().subscribe((cards: CreditCard[]) => {
      this.creditCards = cards;
    });
  }

  changePaymentMethod(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.paymentService.changePaymentMethod(value);
    }
  }
}
