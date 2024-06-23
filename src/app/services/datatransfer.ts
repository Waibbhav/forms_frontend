import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataTransferService {
 private dataSubject = new BehaviorSubject<any>(null);
    
 currentData = this.dataSubject.asObservable();

  setData(data: any) {
    this.dataSubject.next(data);
  }
}
