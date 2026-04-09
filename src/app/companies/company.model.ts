import { Job } from '../shared/job.model';   

export class Company {
    public id: string;
    public name: string;
    public description: string;
    public logoUrl: string;
    public websiteUrl: string;
    public jobs: Job[];

    constructor(name: string, description: string, logoUrl: string, websiteUrl: string) {
        this.name = name;
        this.description = description;
        this.logoUrl = logoUrl;
        this.websiteUrl = websiteUrl;
        this.jobs = [];
    }
}