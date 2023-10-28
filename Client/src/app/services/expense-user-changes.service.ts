import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExpenseUserChangesService {
  private deletedIdSubject = new Subject<number>();

  constructor() {
  }

  onDeleteExpenseClicked(deletedId: number) {
    this.deletedIdSubject.next(deletedId)
  }

  getDeletedId(): Observable<number> {
    return this.deletedIdSubject.asObservable();
  }
}
