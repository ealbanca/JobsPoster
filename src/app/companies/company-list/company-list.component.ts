import { Component, OnDestroy, OnInit } from '@angular/core';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit, OnDestroy {
  companies: Company[] = [];
  private companiesChangedSubscription: Subscription;

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
    // Subscribe to the companiesChanged Subject for reactive updates
    this.companiesChangedSubscription = this.companyService.companiesChanged.subscribe((companies: Company[]) => {
      this.companies = companies;
    });
    // On first load, fetch companies from backend if not already loaded
    if (!this.companyService.companies || this.companyService.companies.length === 0) {
      this.companyService.getCompanies().subscribe((response: any) => {
        const companies = response.companies ? response.companies : response;
        this.companyService.companies = companies;
        this.companyService.companiesChanged.next(companies.slice());
      });
    } else {
      // If already loaded, emit current value
      this.companyService.companiesChanged.next(this.companyService.companies.slice());
    }
  }

  onNewCompany() {}

  ngOnDestroy() {
    if (this.companiesChangedSubscription) {
      this.companiesChangedSubscription.unsubscribe();
    }
  }
}