import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UniqueIdService {

  constructor() { }

  public generateRandomId() : string {
    return crypto.randomUUID().slice(0, 10);
  }
}
