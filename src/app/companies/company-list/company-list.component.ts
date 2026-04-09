import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Company } from '../company.model';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit, OnDestroy {
  companies: Company[] = [];
  private subscription: Subscription;
  private changeSub: Subscription;

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
    // Subscribe to changes in the company list
    this.changeSub = this.companyService.companyListChangedEvent.subscribe((companies: Company[]) => {
      this.companies = companies;
    });
    // Fetch the initial list from the backend
    this.subscription = this.companyService.getCompanies().subscribe((response: any) => {
      this.companies = response.companies ? response.companies : response;
      this.companyService.companies = this.companies;
      this.companyService.sortAndSend();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.changeSub) {
      this.changeSub.unsubscribe();
    }
  }
}
