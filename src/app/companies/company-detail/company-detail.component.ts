import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { WindRefService } from '../../wind-ref.service';


@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
company: Company | undefined;
id: string;
nativeWindow: any;

  constructor( private companyService: CompanyService,
    private windowRefService: WindRefService,
    private route : ActivatedRoute,
    private router : Router,
  ) { 
    this.nativeWindow = windowRefService.getNativeWindow();
  }

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.companyService.getCompany(this.id).subscribe(company => {
          this.company = company;
        });
      }
    );

  }

onView(){
    if(this.company && this.company.websiteUrl) {
      this.nativeWindow.open(this.company.websiteUrl);
  }
}

onDelete() {
  if (this.company) {
    this.companyService.deleteCompany(this.company);
    this.router.navigate(['/companies']);
  }
}
}