import { Address, Coordinate } from 'src/app/shared/types';

export interface TripResponse {
  [key: string]: Trip;
}

export interface Taxi {
  taxiDriver: TaxiDriver;
  position: Coordinate;
}

export interface TaxiDriver {
  name: string;
  phone: string;
  vehicle: Vehicle;
}

export interface Vehicle {
  brand: string;
  model: string;
  plateNumber: string;
}

export interface Trip {
  time: Date;
  pickupAddress: Address;
  arrivalAddress: Address;
  taxiDriver: TaxiDriver;
  amount: number;
  paymentMethod: string;
}
