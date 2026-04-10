import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';


import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
company$: Observable<Company>;
id: string;

  constructor(private companyService: CompanyService,
    private route: ActivatedRoute,
  private router: Router) {
    
  }

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.company$ = this.companyService.getCompany(this.id);
    });
  }

  onDeleteCompany() {
    this.company$.pipe(take(1)).subscribe(company => {
      if (company) {
        this.companyService.deleteCompany(company!).subscribe(() => {
          this.router.navigate(['/companies']);
        });
      }
    });
  }
}
