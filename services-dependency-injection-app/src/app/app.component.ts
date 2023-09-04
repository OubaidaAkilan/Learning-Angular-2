import { Component, OnInit, inject } from '@angular/core';
import { LoggingServiceService } from './logging-service.service';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoggingServiceService, AccountService],
})
export class AppComponent implements OnInit {
  accounts: { name: string; status: string }[] = [];

  constructor(
    private loggingService: LoggingServiceService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accounts = this.accountService.accounts;
  }

  
}
