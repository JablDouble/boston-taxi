export interface Profile {
  email: string;
  localId: string;
  createdAt: string;
}

export interface Address {
  latitude: number;
  longitude: number;
  country: string;
  locality: string;
  street: string;
  number: string;
  label: string;
}

export type InputTypes =
  | 'checkbox'
  | 'file'
  | 'password'
  | 'radio'
  | 'text'
  | 'tel'
  | 'date'
  | 'month'
  | 'number';

export interface Point {
  latitude: number;
  longitude: number;
}

export interface CreditCard {
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  cvv: number;
  accountId: string;
}