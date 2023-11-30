import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckboxService {
  private childCheckboxesSubject = new BehaviorSubject<{[key: string]: boolean}>({});
  childCheckboxes$ = this.childCheckboxesSubject.asObservable();

  constructor() { }

  update(index: string, checked: boolean) {
    const currentCheckboxState = this.childCheckboxesSubject.value;
    currentCheckboxState[index] = checked;
    this.childCheckboxesSubject.next(currentCheckboxState);
  }
}
