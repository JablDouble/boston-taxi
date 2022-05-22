export interface Trip {
    time: Date,
    vehicle: Vehicle,
    pickupAddress: Address,
    arrivalAddress: Address,
    taxiDriver: TaxiDriver,
    amount: number,
    paymentWay: string
}

export interface Address {
    latitude: number,
    longitude: number,
    country: string,
    locality: string,
    street: string,
    number: string,
    label: string
}

export interface Point {
    latitude: number,
    longitude: number
}

export interface PositionStackResponse {
    data: Array<Address>
}

export interface TaxiDriver {
    name: string,
    phone: string
}

export interface CreditCard {
    cardNumber: string;
    cardHolder: string;
    expirationDate: string;
    cvv: number;
    accountId: string;
}

export interface AuthDataUser {
    name: string,
    surname: string,
    email: string,
    password: string
}

export interface FirebaseAuthResponse {
    idToken: string;
    expiresIn: string;
    email: string;
    localId: string;
}

export interface Profile {
    email: string;
    localId: string;
    createdAt: string;
}

export interface Vehicle {
    brand: string;
    model: string;
    plateNumber: string;
}

export interface CarrierInfo {
    taxiDriver: TaxiDriver,
    vehicle: Vehicle
}

export type InputTypes = 'checkbox' | 'file' | 'password' | 'radio' | 'text' | 'tel' | 'date' | 'month' | 'number';