import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Company } from "./company.model";
import { Job } from "../shared/job.model";
import { JobsListService } from "../jobs-list/jobs-list.service";


@Injectable()
export class CompanyService {
    companiesChanged = new Subject<Company[]>();

    //private companies: Company[]  = [
    //    new Company('Bandeja Paisa',
    //        'A traditional Colombian dish',
    //        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_V-_1Hnop7ugXvZQCdVriB8fTVOFz14VOckCTl5HjjDCSp3a0pp3d_ZSE4rZG4uLO_S1X5G6r4MimAFY5lJ5lpL7zYPiAPaFJ-xA1oA&s=10',
    //    [
    //        new Job('Rice', 1),
    //        new Job('Beans', 1),
    //        new Job('Avocado', 1),
    //        new Job('Egg', 2),
    //        new Job('Plantain', 1)
    //    ] ),
    //    new Company('Arepas', 
    //        'Colombian dish made of ground maize dough or cooked flour',
    //        'https://www.oliviascuisine.com/wp-content/uploads/2014/07/IMG_1370-1024x768.jpg',
    //    [
    //        new Job('Arepa dough', 1),
    //        new Job('Cheese', 1)
    //    ]),
    //  ];

    private companies: Company[] = [];

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