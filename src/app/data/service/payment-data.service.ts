import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { PaymentResponseDTO } from '../schema/payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentDataService {
  constructor(private http: HttpClient) {}

  getAllCreditCards(): Observable<PaymentResponseDTO> {
    return this.http.get<PaymentResponseDTO>(`${environment.FIREBASE_API_URL}cards.json`);
  }

  addCreditCard(card: CreditCard): Observable<CreditCard> {
    return this.http.post<CreditCard>(`${environment.FIREBASE_API_URL}cards.json`, card);
  }
}
