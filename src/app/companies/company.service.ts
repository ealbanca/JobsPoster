import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Company } from "./company.model";
import { Job } from "../shared/job.model";
import { JobsListService } from "../jobs-list/jobs-list.service";


@Injectable()
export class CompanyService {
    companiesChanged = new Subject<Company[]>();

    private companies: Company[]  = (() => {
        const google = new Company(
            'Google',
            'Google is a technology company that specializes in internet-related services and products, including search engines, online advertising technologies, cloud computing, software, and hardware.',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png',
            'https://www.google.com'
        );
        google.jobs = [
            new Job(1, 'Software Engineer', 'Develop and maintain software applications.', 'Mountain View, CA', 120000, 'Full-time', 1),
            new Job(2, 'Product Manager', 'Oversee product development and strategy.', 'Mountain View, CA', 110000, 'Full-time', 1)
        ];

        const microsoft = new Company(
            'Microsoft',
            'Microsoft Corporation is a multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2560px-Microsoft_logo.svg.png',
            'https://www.microsoft.com'
        );
        microsoft.jobs = [
            new Job(3, 'Software Developer', 'Design and implement software solutions.', 'Redmond, WA', 115000, 'Full-time', 2),
            new Job(4, 'Data Scientist', 'Analyze and interpret complex data to help make informed decisions.', 'Redmond, WA', 125000, 'Full-time', 2)
        ];

        return [google, microsoft];
    })();

    //private companies: Company[] = [];

    constructor(private jobsListService: JobsListService) {}

    setCompanies(companies: Company[]) {
        this.companies = companies;
        this.companiesChanged.next(this.companies.slice());
    }

    getCompanies() {
        return this.companies.slice();// slice is used to return a copy of the array
    }

    getCompany(index: number) {
        return this.companies[index];
    }

    addJobsToJobList(jobs: Job[]) {
        this.jobsListService.addJobs(jobs);
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