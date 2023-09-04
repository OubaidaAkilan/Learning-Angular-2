import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingServiceService {
  constructor() {}

  logStatus(status: string): void {
    console.log(`your status account is : ${status}`);
  }
}
