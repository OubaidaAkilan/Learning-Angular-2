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
