import { Subject } from "rxjs";

import { Job } from "../shared/job.model";

export class JobsListService {
    jobsChanged = new Subject<Job[]>();
    startedEditing = new Subject<number>();
    private jobs: Job[] = [
        new Job('1', 'Software Engineer', 'Develop and maintain software applications.', 'New York', 120000, 'Full-time', '1'),
        new Job('2', 'Data Analyst', 'Analyze and interpret complex data sets.', 'San Francisco', 90000, 'Full-time', '2'),
        new Job('3', 'Project Manager', 'Oversee project planning and execution.', 'Chicago', 110000, 'Full-time', '3')
    ];

    getJobs() {
        return this.jobs.slice();
    }

    getJob(index: number) {
        return this.jobs[index];
    }

    addJob(job: Job) {
        this.jobs.push(job);
        this.jobsChanged.next(this.jobs.slice());
    }

    addJobs(jobs: Job[]) {
        this.jobs.push(...jobs);
        this.jobsChanged.next(this.jobs.slice());
    }

    updateJob(index: number, newJob: Job) {
        this.jobs[index] = newJob;
        this.jobsChanged.next(this.jobs.slice());
    }

    deleteJob(index: number) {
        this.jobs.splice(index, 1);
        this.jobsChanged.next(this.jobs.slice());
    }
}