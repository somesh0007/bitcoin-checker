import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
private slecetedCurrency$ : BehaviorSubject<string> = new BehaviorSubject<string>("INR")
  constructor() { }
  getCurrency(){
    return this.slecetedCurrency$.asObservable();
  }
  setCurrency(currency:string){
    this.slecetedCurrency$.next(currency)
  }
}
