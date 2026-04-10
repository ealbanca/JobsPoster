import { Component, OnDestroy, OnInit} from '@angular/core';

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
  private subscription: Subscription;
  private companyChangedSubscription: Subscription;

  constructor(private companyService: CompanyService) {

  }

  ngOnInit(){
    // Subscribe to companiesChanged if you want to keep local updates
    this.subscription = this.companyService.getCompanies().subscribe((response: any) => {
      this.companies = response.companies ? response.companies : response;
      });
    this.companyChangedSubscription = this.companyService.companiesChanged.subscribe((companies: Company[]) => {
      this.companies = companies;
    });
  }

  onNewCompany(){

  }

  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.companyChangedSubscription) {
      this.companyChangedSubscription.unsubscribe();
    }
  }
}