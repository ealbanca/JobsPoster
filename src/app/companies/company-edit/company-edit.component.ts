import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators} from '@angular/forms';

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
    this.route.params.subscribe(
      (params : Params ) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit(){
    //const newRecipe = new Recipe(
    //  this.recipeForm.value['name'],
    //  this.recipeForm.value['description'],
    //  this.recipeForm.value['imagePath'],
    //  this.recipeForm.value['ingredients']);
    if (this.editMode){
      this.companyService.updateCompany(this.id, this.companyForm.value);
    } else {
      this.companyService.addCompany(this.companyForm.value);
    }
    this.onCancel();
  }

  onAddJob(){
    (<FormArray>this.companyForm.get('jobs')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
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
    let companyLogoUrl = '';
    let companyDescription = '';
    let companyJobs = new FormArray([]);

    if(this.editMode){
      const company = this.companyService.getCompany(this.id);
      companyName = company.name;
      companyLogoUrl = company.logoUrl; 
      companyDescription = company.description;
        if(company['jobs']){
          for(let job of company.jobs){
            companyJobs.push(
              new FormGroup({
                'name': new FormControl(job.name, Validators.required),
                'amount': new FormControl(job.amount, Validators.required)
              })
            );
          }
        }
    }

    this.companyForm = new FormGroup({
      'name': new FormControl(companyName, Validators.required),
      'logoUrl': new FormControl(companyLogoUrl, Validators.required),
      'description': new FormControl(companyDescription, Validators.required),
      'jobs': companyJobs
    });
  }

  get controls() { // a getter!
    return (<FormArray>this.companyForm.get('jobs')).controls;
  }
}
