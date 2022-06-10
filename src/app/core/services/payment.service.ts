import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { PaymentDataService } from 'src/app/data/service/payment-data.service';
import { CreditCard } from 'src/app/shared/types';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(
    private paymentDataService: PaymentDataService,
    private notificationService: NotificationService,
  ) {}

  private formatCardNumber(s: string) {
    return s.toString().replace(/\d{4}(?=.)/g, '$& ');
  }

  getAllCreditCards(): Observable<CreditCard[]> {
    return this.paymentDataService.getAllCreditCards().pipe(
      map((creditCards) => {
        if (creditCards) {
          return Object.keys(creditCards).map((key: string) => ({
            ...creditCards[key],
            id: key,
          }));
        }

        return [];
      }),
    );
  }

  addCreditCard(card: CreditCard): Observable<CreditCard> {
    return this.paymentDataService
      .addCreditCard({
        ...card,
        cardNumber: this.formatCardNumber(card.cardNumber),
      })
      .pipe(tap(() => this.notificationService.success('Card was added successfully')));
  }
}
