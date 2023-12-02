import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {UpdatedExpense} from "../models/UpdatedExpense";

@Injectable({
  providedIn: 'root'
})
export class ExpenseUserChangesService {
  private deletedIdSubject = new Subject<number>();
  private updatedExpenseSubject = new Subject<UpdatedExpense>()

  constructor() {
  }

  onDeleteExpenseClicked(deletedId: number) {
    this.deletedIdSubject.next(deletedId)
  }

  getDeletedId(): Observable<number> {
    return this.deletedIdSubject.asObservable();
  }

  getUpdatedExpense(): Observable<UpdatedExpense> {
    return this.updatedExpenseSubject.asObservable();
  }
  onExpenseUpdated(updatedExpense: UpdatedExpense) {
    this.updatedExpenseSubject.next(updatedExpense)

  }
}
