import { CreditCard } from 'src/app/shared/types';

export interface PaymentResponseDTO {
  [key: string]: CreditCard;
}
