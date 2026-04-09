import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

import { Company } from "./company.model";
import { Job } from "../shared/job.model";
import { JobsListService } from "../jobs-list/jobs-list.service";

@Injectable()
export class CompanyService {
    companiesChanged = new Subject<Company[]>();
    private companies: Company[] = [];

    constructor(private jobsListService: JobsListService, private http: HttpClient) {}

    setCompanies(companies: Company[]) {
        this.companies = companies;
        this.companiesChanged.next(this.companies.slice());
    }

    getCompanies() {
        return this.http.get<{ companies: Company[] }>("http://localhost:3000/companies")
            .pipe(map(response => response.companies));
    }

    getCompany(index: number) {
        return this.http.get<Company>(`http://localhost:3000/companies/${index}`);
    }

    getMaxCompanyId(): number {
        let maxId = 0;
        this.companies.forEach(company => {
            const currentId = parseInt(company.id);
            if (currentId > maxId) {
                maxId = currentId;
            }
        });
        return maxId;
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