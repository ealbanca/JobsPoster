import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import {Job} from '../shared/job.model';

@Component({
  selector: 'cms-jobs',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {
  }
}
