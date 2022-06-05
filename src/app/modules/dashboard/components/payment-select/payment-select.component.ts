import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CreditCard } from '../../interfaces';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment-select',
  templateUrl: './payment-select.component.html',
  styleUrls: ['./payment-select.component.scss'],
})
export class PaymentSelectComponent implements OnInit {
  @Output() onChangePaymentWay: EventEmitter<string> = new EventEmitter<string>();

  creditCards: CreditCard[];

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.paymentService.getAllCreditCards().subscribe((cards: CreditCard[]) => {
      this.creditCards = cards;
    });

    this.onChangePaymentWay.emit('cash');
  }

  changePaymentWay(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.onChangePaymentWay.emit(value);
    }
  }
}
