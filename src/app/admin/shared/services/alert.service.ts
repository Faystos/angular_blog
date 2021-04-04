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
    // this.alert$.next({
    //   type: 'success', text
    // });
  }

  danger = (text: string, type: AlertType = 'danger') => {
    this.handlerAlert(text, type);
    // this.alert$.next({
    //   type: 'danger', text
    // });
  }

  warning = (text: string, type: AlertType = 'warning') => {
    this.handlerAlert(text, type);
    // this.alert$.next({
    //   type: 'warning', text
    // });
  }

  private handlerAlert = (text: string, type: AlertType) => {
    this.alert$.next({
      text,
      type
    });
  }
}
