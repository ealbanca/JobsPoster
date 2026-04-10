import { Injectable, EventEmitter } from "@angular/core";
import { EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Company } from "./company.model";
import { JobsListService } from "../jobs-list/jobs-list.service";

@Injectable()
export class CompanyService {
    companyListChanged = new Subject<Company[]>();
    companySelected = new Subject<Company>();
    companies: Company[] = [];
    companiesChanged = new Subject<Company[]>();
    maxCompanyId: number;
    

    constructor(private http: HttpClient) {
        this.maxCompanyId = this.getMaxCompanyId();
    }

    getCompanies() {
        return this.http.get<any>("http://localhost:3000/companies")
    }

    getCompany(id: string) {
        return this.http.get<Company>(`http://localhost:3000/companies/${id}`);
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

    addCompany(newCompany: Company) {
        if (!newCompany || newCompany === undefined) {
            return;
        }
        newCompany.id = '';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.http.post<{ message: string, company: Company }>(
            "http://localhost:3000/companies",
            newCompany,
            { headers: headers }
        ).subscribe(response => {
            // Add the new company to the local array and emit the change
            if (response && response.company) {
                this.companies = [...this.companies, response.company];
                this.companiesChanged.next(this.companies.slice());
            } else {
                // fallback: re-fetch the full list if response is not as expected
                this.getCompanies().subscribe(companies => {
                    this.companies = companies;
                    this.companiesChanged.next(this.companies.slice());
                });
            }
        });
    }

    updateCompany(originalCompany: Company, newCompany: Company) {
        if (!originalCompany || !newCompany) {
            return EMPTY;
        }
        newCompany.id = originalCompany.id;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put(
            `http://localhost:3000/companies/${originalCompany.id}`,
            newCompany,
            { headers: headers }
        ).pipe(
            tap(() => {
                const pos = this.companies.findIndex(c => c.id === originalCompany.id);
                if (pos >= 0) {
                    // Replace with a new object reference to trigger Angular change detection
                    this.companies = [
                        ...this.companies.slice(0, pos),
                        { ...newCompany },
                        ...this.companies.slice(pos + 1)
                    ];
                    this.companiesChanged.next(this.companies.slice());
                }
            })
        );
    }

    deleteCompany(company: Company) {
        if(!company || company === undefined) {
            return EMPTY;
        }
        const pos = this.companies.findIndex(c => c.id === company.id);
        if (pos >= 0) {
            this.companies.splice(pos, 1);
            this.companiesChanged.next(this.companies.slice());
        }
        return this.http.delete(`http://localhost:3000/companies/${company.id}`);
    }
}