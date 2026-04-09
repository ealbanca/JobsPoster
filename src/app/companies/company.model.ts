import { Job } from '../shared/job.model';   

export class Company {
    public _id?: string; // MongoDB ObjectId
    public id: string;
    public name: string;
    public description: string;
    public logoUrl: string;
    public websiteUrl: string;
    public jobs: Job[];

    constructor(id: string, name: string, description: string, logoUrl: string, websiteUrl: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.logoUrl = logoUrl;
        this.websiteUrl = websiteUrl;
        this.jobs = [];
    }
}