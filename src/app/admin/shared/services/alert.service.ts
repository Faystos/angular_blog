import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";

export type AlertType = 'success' | 'danger' | 'warning';

export interface Alert {
  text: string,
  type: AlertType
}

@Injectable()
export class AlertService {
  public alert$ = new Subject<Alert>();


  success = (text: string, type: AlertType = 'success') => {
    this.handlerAlert(text, type);
  }

  danger = (text: string, type: AlertType = 'danger') => {
    this.handlerAlert(text, type);
  }

  warning = (text: string, type: AlertType = 'warning') => {
    this.handlerAlert(text, type);
  }

  private handlerAlert = (text: string, type: AlertType) => {
    this.alert$.next({
      text,
      type
    });
  }
}
