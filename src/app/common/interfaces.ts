export interface Profile {
    email: string;
    localId: string;
    createdAt: string;
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

export interface Notification {
    message: string,
    type: NotificationType,
}

export enum NotificationType {
    ERROR = 'error',
    SUCCESS = 'success',
    WARNING = 'warning'
}

export type InputTypes = 'checkbox' | 'file' | 'password' | 'radio' | 'text' | 'tel' | 'date' | 'month' | 'number';