import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Job } from '../../shared/job.model';
import { JobsListService } from '../jobs-list.service';

@Component({
  selector: 'app-jobs-edit',
  templateUrl: './jobs-edit.component.html',
  styleUrls: ['./jobs-edit.component.css']
})
export class JobsEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Job;
  
  constructor(private jobsListService: JobsListService) { }

  ngOnInit(){
    this.subscription = this.jobsListService.startedEditing
      .subscribe((index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.jobsListService.getJob(index);
        this.slForm.setValue({
          title: this.editedItem.title,
          description: this.editedItem.description,
          location: this.editedItem.location,
          salary: this.editedItem.salary,
          type: this.editedItem.type,
          companyId: this.editedItem.companyId
        });
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newJob = new Job(0, value.title, value.description, value.location, value.salary, value.type, 0);
    if (this.editMode) {
      this.jobsListService.updateJob(this.editedItemIndex, newJob);
    } else {
      this.jobsListService.addJob(newJob);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    if (this.editMode) {
      this.jobsListService.deleteJob(this.editedItemIndex);
      this.onClear();
    }

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
