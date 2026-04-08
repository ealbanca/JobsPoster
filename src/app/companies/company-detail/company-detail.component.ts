import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Company } from '../company.model';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})

export class CompanyDetailComponent implements OnInit {
  company: Company;
  id: number;

  constructor(private companyService: CompanyService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.companyService.getCompany(this.id + '').subscribe(company => {
            this.company = company;
          });
        }
      );
  }

  onAddJob() {
    this.router.navigate(['add-job'], {relativeTo: this.route});
  }
  
  onEditCompany() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteCompany() {
    this.companyService.deleteCompany(this.id + '').subscribe(() => {
      this.router.navigate(['/companies']);
    });
  }

}
