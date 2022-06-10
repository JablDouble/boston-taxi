import { Address } from 'src/app/shared/types';

export interface TripResponse {
  [key: string]: Trip;
}

export interface TaxiDriver {
  name: string;
  phone: string;
}

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
