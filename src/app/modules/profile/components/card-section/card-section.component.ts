import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/core/services/payment.service';
import { CreditCard } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-card-section',
  templateUrl: './card-section.component.html',
  styleUrls: ['./card-section.component.scss'],
})
export class CardSectionComponent {
  @Output() submitted: EventEmitter<void> = new EventEmitter<void>();

  error: string;

  creditCardForm = new FormGroup({
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

  constructor(private paymentService: PaymentService) {}

  addCreditCard() {
    if (this.creditCardForm.valid) {
      const creditCard: CreditCard = {
        ...this.creditCardForm.value,
      };

      this.paymentService.addCreditCard(creditCard).subscribe(() => {
        this.submitted.emit();
        this.creditCardForm.reset();
      });
    }
  }
}
