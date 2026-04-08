import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';

import { Company } from './company.model';
import {Job} from '../shared/job.model';

@Injectable()
export class CompanyService {
    companiesChanged = new Subject<Company[]>();

    private companies: Company[] = [];

    constructor() {
        const company1 = new Company(1, 'Tech Solutions', 'Leading provider of tech solutions', 'https://m.media-amazon.com/images/I/2128q5aAVQL.png', 'https://techsolutions.com');
        company1.jobs = [new Job(1, 'Software Engineer', 'Develop and maintain software applications', 'New York, NY', 90000, 'Full-time', 1)];

        const company2 = new Company(2, 'Creative Agency', 'Innovative marketing and design agency', 'https://m.media-amazon.com/images/I/2128q5aAVQL.png', 'https://creativeagency.com');
        company2.jobs = [new Job(2, 'Graphic Designer', 'Create visual concepts and designs', 'Los Angeles, CA', 60000, 'Full-time', 2)];

        const company3 = new Company(3, 'Financial Services Inc.', 'Comprehensive financial services provider', 'https://m.media-amazon.com/images/I/2128q5aAVQL.png', 'https://financialservices.com');
        company3.jobs = [new Job(3, 'Financial Analyst', 'Analyze financial data and trends', 'Chicago, IL', 75000, 'Full-time', 3)];

        this.companies = [company1, company2, company3];
    }


    setCompanies(companies: Company[]) {
        this.companies = companies;
        this.companiesChanged.next(this.companies.slice());
    }
    // get a copy of the companies array to prevent external modification
    getCompanies() {
        return this.companies.slice();
    }

    getCompany(index: number) {
        return this.companies[index];
    }

    addJobToCompany(companyIndex: number, job: Job) {
        this.companies[companyIndex].jobs.push(job);
        this.companiesChanged.next(this.companies.slice());
    }

    addCompany(company: Company) {
        this.companies.push(company);
        this.companiesChanged.next(this.companies.slice());
    }

    updateCompany(index: number, newCompany: Company) {
        this.companies[index] = newCompany;
        this.companiesChanged.next(this.companies.slice());
    }

    deleteCompany(index: number) {
        this.companies.splice(index, 1);
        this.companiesChanged.next(this.companies.slice());
    }
}