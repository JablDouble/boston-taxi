import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreditCard } from '../../interfaces';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment-manage',
  templateUrl: './payment-manage.component.html',
  styleUrls: ['./payment-manage.component.scss'],
})
export class PaymentManageComponent implements OnInit {
  isShowAddCardBlock: boolean = false;

  creditCardForm: FormGroup;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.creditCardForm = new FormGroup({
      cardNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
      ]),
      cardHolder: new FormControl(null, [Validators.required]),
      expirationDate: new FormControl(null, [Validators.required]),
      cvv: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3),
      ]),
    });
  }

  changeAddCardBlockStatus() {
    this.isShowAddCardBlock = !this.isShowAddCardBlock;
  }

  addNewCreditCard() {
    if (this.creditCardForm.valid) {
      const creditCard: CreditCard = {
        ...this.creditCardForm.value,
      };

      this.paymentService.addNewCreditCard(creditCard).subscribe(() => {
        this.isShowAddCardBlock = false;
        this.creditCardForm.reset();
      });
    }
  }
}
