import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NotificationType } from '../errors/error-types';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(public notifierService: NotifierService) {
    }

    success(message: string) {
        this.notify(message, NotificationType.SUCCESS);
    }

    warning(message: string) {
        this.notify(message, NotificationType.WARNING);
    }

    error(message: string) {
        this.notify(message, NotificationType.ERROR);
    }

    private notify(message: string, type: NotificationType = NotificationType.SUCCESS) {
        this.notifierService.show({
            message,
            type
        })
    }
}