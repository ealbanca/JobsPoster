import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Company } from '../company.model';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit, OnDestroy {
  companies: Company[];
  subscription: Subscription;
  
  constructor() { }

  ngOnInit() {
    // this.companies = this.companyService.getCompanies();
    // this.subscription = this.companyService.companiesChanged
    //   .subscribe(
    //     (companies: Company[]) => {
    //       this.companies = companies;
    //     }
    //   );
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
