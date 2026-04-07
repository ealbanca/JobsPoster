import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import {Job} from '../shared/job.model';
import { JobsListService } from './jobs-list.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit, OnDestroy {
  jobs: Job[] = [];
  private subscription: Subscription;

  constructor(private jobsListService: JobsListService) { }

  ngOnInit(){
    this.jobs = this.jobsListService.getJobs();
    this.subscription = this.jobsListService.jobsChanged
      .subscribe((jobs: Job[]) => {
        this.jobs = jobs;
      });
  }

  onEditItem(index: number) {
    this.jobsListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
