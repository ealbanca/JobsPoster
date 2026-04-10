import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Job } from "../shared/job.model";

@Injectable({ providedIn: 'root' })
export class JobsListService {
    jobsChanged = new Subject<Job[]>();
    startedEditing = new Subject<number>();
    private jobs: Job[] = [];

    constructor(private http: HttpClient) {}

    getJobs() {
        this.http.get<{ jobs: Job[] }>('http://localhost:3000/jobs')
            .subscribe(response => {
                this.jobs = response.jobs;
                this.jobsChanged.next(this.jobs.slice());
            });
        return this.jobs.slice();
    }

    getJob(index: number) {
        return this.jobs[index];
    }

    addJob(job: Job) {
        this.http.post<Job>('http://localhost:3000/jobs', job)
            .subscribe(() => {
                this.http.get<{ jobs: Job[] }>('http://localhost:3000/jobs')
                    .subscribe(response => {
                        this.jobs = response.jobs;
                        this.jobsChanged.next(this.jobs.slice());
                    });
            });
    }

    addJobs(jobs: Job[]) {
        // Optionally implement bulk add if your backend supports it
        jobs.forEach(job => this.addJob(job));
    }

    updateJob(index: number, newJob: Job) {
        const jobToUpdate = this.jobs[index];
        if (!jobToUpdate) return;
        this.http.put(`http://localhost:3000/jobs/${jobToUpdate.id}`, newJob)
            .subscribe(() => {
                this.http.get<{ jobs: Job[] }>('http://localhost:3000/jobs')
                    .subscribe(response => {
                        this.jobs = response.jobs;
                        this.jobsChanged.next(this.jobs.slice());
                    });
            });
    }

    deleteJob(index: number) {
        const jobToDelete = this.jobs[index];
        if (!jobToDelete) return;
        this.http.delete(`http://localhost:3000/jobs/${jobToDelete.id}`)
            .subscribe(() => {
                this.http.get<{ jobs: Job[] }>('http://localhost:3000/jobs')
                    .subscribe(response => {
                        this.jobs = response.jobs;
                        this.jobsChanged.next(this.jobs.slice());
                    });
            });
    }
}