import { CreditCard } from 'src/app/shared/interfaces';

export interface PaymentResponseDTO {
  [key: string]: CreditCard;
}
