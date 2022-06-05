import { Address } from 'src/app/shared/interfaces';

export interface Vehicle {
  brand: string;
  model: string;
  plateNumber: string;
}

export interface Trip {
  time: Date;
  vehicle: Vehicle;
  pickupAddress: Address;
  arrivalAddress: Address;
  taxiDriver: TaxiDriver;
  amount: number;
  paymentWay: string;
}

export interface Point {
  latitude: number;
  longitude: number;
}

export interface TaxiDriver {
  name: string;
  phone: string;
}

export interface CreditCard {
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  cvv: number;
  accountId: string;
}

export interface CarrierInfo {
  taxiDriver: TaxiDriver;
  vehicle: Vehicle;
}
