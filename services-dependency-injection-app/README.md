# Services Dependency Injection App

## Dependency Injection DI
**Dependencies:** It is tools like (data or methods, featuers) whereas we can add it into the component to work correctly.  

Assume we have a treehouse as a component and to be the treehouse intresting and funny we should provide a ladder for it.  
A ladder here as (Dependencies) because the treehouse that represent a (component) depend on it, and here when you try to provide the depndencies for the component called (Dependency Injection).  

**Dependency Injection:** Provide and inject dependencies like services into components, in another meaning it is an encapsulate logic you can share it with many components.

## Steps to create a service
* You can create a service utilizes CLI 
```bash
ng g s [service-name]
```
* You should import the service inside the componet.
* Inside the decorator of component, add the providers property and put the service there.
> ***Note***: *Don't do this step with its children and if the parent's component has service don't do this one too, don't ignore this note because If you did that, the service will not work correctly.(review the hierarchical Injector )*
```typescript
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers:[AccountService ]
})
```
* Inject the service into the component through its constructor
```typescript
constructor(private accountService: AccountService) {}
```
## Understanding the hierarchical Injector

* APPModule => Same instance of service is availabe Application-wide.
* AppComponent => Same instance of service is available for all components "But not for other services".
* Any Other Component => Same instance of service is available for the component and all its children components. 
## Full Example:
account.service.ts
```typescript
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
  /* 
  The "new syntax" does offer one advantage though: Services can be loaded lazily by Angular
   (behind the scenes) and redundant code can be removed automatically. 
   This can lead to a better performance and loading speed - though this really
   only kicks in for bigger services and apps in general.
  */
})
export class AccountService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active',
    },
    {
      name: 'Testaccount',
      status: 'inactive',
    },
    {
      name: 'Hidden Account',
      status: 'unknown',
    },
  ];

  statusUpdated = new EventEmitter<string>();

  addAccount(newAccount: { name: string; status: string }) {
    this.accounts.push(newAccount);
  }

  updateStatus(updateInfo: { id: number; newStatus: string }) {
    this.accounts[updateInfo.id].status = updateInfo.newStatus;
  }

  constructor() {}
}
```
loggingservice.service.ts
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  constructor() {}

  logStatus(status: string): void {
    console.log(`your status account is : ${status}`);
  }
}
```
account.component.ts
```typescript
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoggingServiceService } from '../logging-service.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  @Input() account: { name: string; status: string } = { name: '', status: '' };
  @Input() id: number = 0;

  constructor(
    private accountService: AccountService,
    private LoggingServiceService: LoggingServiceService
  ) {}

  SetTo(status: string) {
    this.accountService.updateStatus({ id: this.id, newStatus: status });
    this.LoggingServiceService.logStatus(status);
    this.accountService.statusUpdated.emit(status);
  }
}
```
