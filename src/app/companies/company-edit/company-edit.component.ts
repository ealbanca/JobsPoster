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
    if (this.editMode) {
      this.companyService.getCompany(this.id).subscribe(company => {
        const jobs = value.jobs ? value.jobs.map((j: any, idx: number) => ({
          title: j.title,
          location: company.jobs && company.jobs[idx] ? company.jobs[idx].location : j.location || '',
          salary: j.salary
        })) : [];
        const newCompany = {
          id: String(this.id),
          name: value.name,
          logoUrl: value.logoUrl,
          websiteUrl: value.websiteUrl,
          description: value.description,
          jobs: jobs
        };
        this.companyService.updateCompany(this.id, newCompany);
        this.onCancel();
      });
    } else {
      const jobs = value.jobs ? value.jobs.map((j: any) => ({
        title: j.title,
        location: j.location || '',
        salary: j.salary
      })) : [];
      const newCompany = {
        id: Date.now().toString(),
        name: value.name,
        logoUrl: value.logoUrl,
        websiteUrl: value.websiteUrl,
        description: value.description,
        jobs: jobs
      };
      this.companyService.addCompany(newCompany);
      this.onCancel();
    }
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
      this.companyService.getCompany(this.id).subscribe(company => {
        companyName = company.name;
        companyLogoUrl = company.logoUrl;
        companyWebsiteUrl = company.websiteUrl;
        companyDescription = company.description;
        if (company.jobs) {
          for (let job of company.jobs) {
            companyJobs.push(
              new FormGroup({
                'title': new FormControl(job.title, Validators.required),
                'salary': new FormControl(job.salary, Validators.required)
              })
            );
          }
        }
        this.companyForm = new FormGroup({
          'name': new FormControl(companyName, Validators.required),
          'websiteUrl': new FormControl(companyWebsiteUrl, Validators.required),
          'logoUrl': new FormControl(companyLogoUrl, Validators.required),
          'description': new FormControl(companyDescription, Validators.required),
          'jobs': companyJobs
        });
      });
    } else {
      this.companyForm = new FormGroup({
        'name': new FormControl(companyName, Validators.required),
        'websiteUrl': new FormControl(companyWebsiteUrl, Validators.required),
        'logoUrl': new FormControl(companyLogoUrl, Validators.required),
        'description': new FormControl(companyDescription, Validators.required),
        'jobs': companyJobs
      });
    }
  }

  get controls() { // a getter!
    return (<FormArray>this.companyForm.get('jobs')).controls;
  }
}
