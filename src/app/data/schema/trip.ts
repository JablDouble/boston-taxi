import { Address, Coordinate } from 'src/app/shared/types';

export interface TripResponse {
  [key: string]: Trip;
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

export enum Tariff {
  Economy = 'economy',
  Standart = 'standart',
  Business = 'business',
  Children = 'children',
}

export interface TaxiOrder {
  pickupAddress: Address;
  arrivalAddress: Address;
  paymentMethod: string;
  tariff: Tariff;
}

export enum TripStatus {
  Search = 'search',
  Accepted = 'accepted',
  Waiting = 'waiting',
  Start = 'start',
  Completion = 'completion',
}

export interface Trip extends TaxiOrder {
  id?: string;
  time: Date;
  taxiDriver?: TaxiDriver;
  taxiPosition?: Coordinate;
  amount: number;
  status: TripStatus;
}
