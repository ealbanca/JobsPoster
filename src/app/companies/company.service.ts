import { Injectable, EventEmitter } from "@angular/core";
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
        if (!newCompany || newCompany === undefined){
            return;
        }
        newCompany.id = '';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.http.post<{ message: string, company: Company }>(
            "http://localhost:3000/companies", 
            newCompany, 
            { headers: headers }
        ).subscribe(response => {
            // Re-fetch the full list from the backend
            this.getCompanies().subscribe(companies => {
                this.companies = companies;
                this.companiesChanged.next(this.companies.slice());
            });
        });
    }

    updateCompany(originalCompany: Company, newCompany: Company) {
        if (!originalCompany || !newCompany || originalCompany === undefined || newCompany === undefined) {
            return;
        }
        const pos = this.companies.findIndex(c => c.id === originalCompany.id);
        if (pos < 0) {
            return;
        }
        newCompany.id = originalCompany.id;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.http.put(
            `http://localhost:3000/companies/${originalCompany.id}`,
            newCompany,
            { headers: headers }
        ).subscribe(response => {
            this.companies[pos] = newCompany;
            this.companiesChanged.next(this.companies.slice());
        });
    }

    deleteCompany(company: Company) {
        if(!company || company === undefined) {
            return;
        }
        const pos = this.companies.findIndex(c => c.id === company.id);
        if (pos < 0) {
            return;
        }
        this.http.delete(`http://localhost:3000/companies/${company.id}`).subscribe(() => {
            this.companies.splice(pos, 1);
            this.companiesChanged.next(this.companies.slice());
        });
    }
}