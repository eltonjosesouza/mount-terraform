import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResourceServiceService {

  private storage: Storage = localStorage;


  constructor() {
    this.storage = window.localStorage;
  }

  set(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

}
