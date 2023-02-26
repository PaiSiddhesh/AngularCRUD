import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() {
       }
      // loging  errors 
       log (...msg:any[]){
         console.log(...msg);
   }
}
