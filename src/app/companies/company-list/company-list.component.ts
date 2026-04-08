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
  private companiesChangedSubscription: Subscription;
  
  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.subscription = this.companyService.getCompanies().subscribe((response: any) => {
      this.companies = response.companies;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.companiesChangedSubscription) {
      this.companiesChangedSubscription.unsubscribe();
    }
  }
}
