import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {FinancialActivity} from "../models/FinancialActivity";

@Injectable({
  providedIn: 'root'
})
export class FinancialActivitiesChangesService {
  private addedFinancialActivitySubject = new Subject<FinancialActivity>()

  constructor() {
  }

  getAddedFinancialActivity(): Observable<FinancialActivity> {
    return this.addedFinancialActivitySubject.asObservable();
  }

  onFinancialActivityAdded(financialActivity: FinancialActivity) {
    this.addedFinancialActivitySubject.next(financialActivity);

  }
}
