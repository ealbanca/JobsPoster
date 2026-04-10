import { Job } from '../shared/job.model';   

export class Company {

    constructor(public id: string, 
        public name: string, 
        public description: string, 
        public logoUrl: string, 
        public websiteUrl: string,
        public jobs: Job[] = []) {
    }
}