import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators} from '@angular/forms';

import { CompanyService } from '../company.service';

@Component({
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
    this.route.params.subscribe(
      (params : Params ) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit(){
    const value = this.companyForm.value;
    const jobs = value.jobs ? value.jobs.map((j: any, idx: number) => ({
      title: j.title,
      location: this.editMode && this.companyService.getCompany(this.id).jobs[idx]
        ? this.companyService.getCompany(this.id).jobs[idx].location
        : j.location || '',
      salary: j.salary
    })) : [];
    const newCompany = {
      id: this.editMode ? String(this.id) : Date.now().toString(),
      name: value.name,
      logoUrl: value.logoUrl,
      websiteUrl: value.websiteUrl,
      description: value.description,
      jobs: jobs
    };
    if (this.editMode){
      this.companyService.updateCompany(this.id, newCompany);
    } else {
      this.companyService.addCompany(newCompany);
    }
    this.onCancel();
  }

  onDeleteJob(index: number){
    (<FormArray>this.companyForm.get('jobs')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let companyName = '';
    let companyLogoUrl = '';
    let companyDescription = '';
    let companyWebsiteUrl = '';
    let companyJobs: FormArray<FormGroup> = new FormArray<FormGroup>([]);

    if (this.editMode) {
      const company = this.companyService.getCompany(this.id);
      companyName = company.name;
      companyLogoUrl = company.logoUrl;
      companyWebsiteUrl = company.websiteUrl;
      companyDescription = company.description;
      if (company['jobs']) {
        for (let job of company.jobs) {
          companyJobs.push(
            new FormGroup({
              'title': new FormControl(job.title, Validators.required),
              'salary': new FormControl(job.salary, Validators.required)
            })
          );
        }
      }
    }

    this.companyForm = new FormGroup({
      'name': new FormControl(companyName, Validators.required),
      'websiteUrl': new FormControl(companyWebsiteUrl, Validators.required),
      'logoUrl': new FormControl(companyLogoUrl, Validators.required),
      'description': new FormControl(companyDescription, Validators.required),
      'jobs': companyJobs
    });
  }

  get controls() { // a getter!
    return (<FormArray>this.companyForm.get('jobs')).controls;
  }
}
