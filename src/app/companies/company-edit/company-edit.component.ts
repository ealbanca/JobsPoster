import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { CompanyService } from '../company.service';
import { Company } from '../company.model';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  originalCompany: Company;
  company: Company = new Company('', '', '', '', '', []);
  editMode: boolean = false;

  constructor(private route: ActivatedRoute,
    private companyService: CompanyService,
    private router: Router) { }

  ngOnInit(){
    this.route.params.subscribe(
      (params : Params ) => {
        const id = params['id'];
        if (!id) {
          this.editMode = false;
          return;
        }
        else {
          this.companyService.getCompany(id).subscribe(company => {
            console.log('Company received from backend:', company);
            this.originalCompany = company;
            if (!company) {
              this.editMode = false;
              return;
            }
            else {
              this.editMode = true;
              this.company = JSON.parse(JSON.stringify(this.originalCompany));
            }
          });
        }
      }
    );
  }


  onSubmit(form: NgForm) {
    if (this.editMode) {
      this.companyService.updateCompany(this.originalCompany, this.company).subscribe(() => {
        this.router.navigate(['/companies', this.company.id]);
      });
    } else {
      this.companyService.addCompany(this.company);
      this.router.navigate(['/companies']);
    }
  }

  onDeleteJob(index: number) {
     this.company.jobs.splice(index, 1);
  }

  onCancel(){
    this.router.navigate(['/companies']);
  }

}