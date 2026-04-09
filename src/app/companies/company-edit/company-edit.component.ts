import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Company } from '../company.model';
import { CompanyService } from '../company.service';


@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  originalCompany: Company | undefined;
  company: Company = new Company('', '', '', '');
  editMode: boolean = false;

  constructor(private companyService: CompanyService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id === undefined || id === null) {
        this.editMode = false;
        return;
      }
      else {
        this.companyService.getCompany(id).subscribe(company => {
          this.originalCompany = company;
          if (this.originalCompany === undefined || this.originalCompany === null) {
            return;
          }
          else {
            this.editMode = true;
            this.company = JSON.parse(JSON.stringify(this.originalCompany));
          }
        });
      }
    });  
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newCompany = new Company(value.name, value.description, value.logoUrl, value.websiteUrl);
    if (this.editMode) {
      if (this.originalCompany) {
        this.companyService.updateCompany(this.originalCompany, newCompany);
      }
    } else {
      this.companyService.addCompany(newCompany);
    }
    this.router.navigate(['/companies']);
  }

  onCancel(){
    this.router.navigate(['/companies']);
  }

}
