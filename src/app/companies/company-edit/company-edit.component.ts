import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  id: number;
  editMode = false;
  companyForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private companyService: CompanyService,
              private router: Router) { }
  
  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit(){
    if(this.editMode){
      this.companyService.updateCompany(this.id, this.companyForm.value);
    } else {
      this.companyService.addCompany(this.companyForm.value);
    }
    this.onCancel();
  }

  onAddJob(){
    (<FormArray>this.companyForm.get('jobs')).push(
      new FormGroup({
        'title': new FormControl(null, Validators.required),
        'description': new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteJob(index: number){
    (<FormArray>this.companyForm.get('jobs')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm(){
    let companyName = '';
    let companyDescription = '';
    let companyImagePath = '';
    let companyWebsiteUrl = '';
    let companyJobs: FormArray<FormGroup> = new FormArray<FormGroup>([]);

    if(this.editMode){
      const company = this.companyService.getCompany(this.id);
      companyName = company.name;
      companyDescription = company.description;
      companyImagePath = company.logoUrl || '';
      companyWebsiteUrl = company.websiteUrl || '';
      if(company['jobs']){
        for(let job of company.jobs){
          companyJobs.push(
            new FormGroup({
              'title': new FormControl(job.title, Validators.required),
              'jobId': new FormControl(job.id, Validators.required)
            })
          );
        }
      }
    }

    this.companyForm = new FormGroup({
      'name': new FormControl(companyName, Validators.required),
      'imagePath': new FormControl(companyImagePath, Validators.required),
      'websiteUrl': new FormControl(companyWebsiteUrl, Validators.required),
      'description': new FormControl(companyDescription, Validators.required),
      'jobs': companyJobs
    });
  }

  get controls() { // a getter!
    return (<FormArray>this.companyForm.get('jobs')).controls;
  }
}
