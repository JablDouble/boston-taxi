import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Notification, NotificationType } from '../interfaces';

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
        const notification: Notification = {
            message,
            type,
        }

        this.notifierService.show(notification)
    }
}