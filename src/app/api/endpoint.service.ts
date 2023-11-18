import { Injectable } from '@angular/core';
import {of, Observable } from 'rxjs'
import { usercopeGroupPreference } from './api';
import { UserScopePreference } from './scope';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  constructor() { }

  getScopes(): Observable<UserScopePreference[]> {
    return of(usercopeGroupPreference)
  }
}
