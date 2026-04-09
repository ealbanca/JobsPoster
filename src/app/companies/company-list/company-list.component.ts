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
    this.subscription =this.companyService.companiesChanged
    .subscribe(
      (companies: Company[]) => {
        this.companies = companies;
      } );
    this.companies = this.companyService.getCompanies();
  }

  onNewCompany(){
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}