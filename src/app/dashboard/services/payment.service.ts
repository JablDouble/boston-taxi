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
    return this.http.get<CreditCard[]>(`${environment.FIREBASE_API_URL}cards.json`).pipe(
      map((response: { [key: string]: any }) => {
        return response ? Object.keys(response).map((key: string) => ({
          ...response[key],
          id: key
        })) : [];
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
