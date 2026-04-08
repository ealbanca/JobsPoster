import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  
  constructor(private companyService: CompanyService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.companyService.getCompanies().subscribe((response: any) => {
      this.companies = response.companies;
    });
    this.companiesChangedSubscription = this.companyService.companyChangedEvent.subscribe((companies: Company[]) => {
      this.companies = companies;
    });
  }

  onEditCompany() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onNewCompany() {
    this.router.navigate(['new'], { relativeTo: this.route });
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
