import { CreditCard } from 'src/app/modules/dashboard/interfaces';

export interface PaymentResponseDTO {
  [key: string]: CreditCard;
}
