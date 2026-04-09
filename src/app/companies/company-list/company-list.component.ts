import { Component, OnDestroy, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']  
})
export class CompanyListComponent implements OnInit, OnDestroy {
  companies: Company[];
  subscription: Subscription;

  constructor(private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(){
    // Subscribe to companiesChanged if you want to keep local updates
    this.subscription = this.companyService.companiesChanged
      .subscribe((companies: Company[]) => {
        this.companies = companies;
      });

    // Fetch companies from backend on init
    this.companyService.getCompanies().subscribe((companies: Company[]) => {
      this.companies = companies;
      this.companyService.setCompanies(companies); // update the service's local array and notify subscribers
    });
  }

  onNewCompany(){
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}