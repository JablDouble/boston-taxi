import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CreditCard } from 'src/app/dashboard/interfaces';
import { environment } from 'src/environments/environment';

@Injectable()
export class PaymentService {

  constructor(private http: HttpClient) { }

  private cardFormat(s: string) {
    return s.toString().replace(/\d{4}(?=.)/g, '$& ');
  }

  getAllCreditCards(): Observable<CreditCard[]> {
    return this.http.get<{ [key: string]: CreditCard }>(`${environment.FIREBASE_API_URL}cards.json`).pipe(
      map((creditCards) => {

        if (creditCards) {
          return Object.keys(creditCards).map((key: string) => ({
            ...creditCards[key],
            id: key
          }))
        }

        return [];
      })
    );
  }

  addNewCreditCard(card: CreditCard): Observable<CreditCard> {
    return this.http.post<CreditCard>(`${environment.FIREBASE_API_URL}cards.json`, {
      ...card,
      cardNumber: this.cardFormat(card.cardNumber)
    });
  }
}
