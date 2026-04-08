import {Injectable, EventEmitter} from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Company } from './company.model';
import {Job} from '../shared/job.model';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    companyListChanged = new Subject<Company[]>();
    companySelectedEvent = new EventEmitter<Company>();
    company: Company[] = [];
    companyChangedEvent = new EventEmitter<Company[]>();

    constructor(private http: HttpClient) {}

    // get a copy of the companies array to prevent external modification
    getCompanies() {
        return this.http.get<Company[]>('http://localhost:3000/companies');
    }

    getCompany(id: string) {
        return this.http.get<Company>(`http://localhost:3000/companies/${id}`);
    }

    addCompany(company: Company) {
        return this.http.post<Company>('http://localhost:3000/companies', company);
    }

    updateCompany(originalCompany: Company, newCompany: Company) {
        if (!originalCompany || !newCompany || originalCompany === undefined || newCompany === undefined) {
            return;
        }
        const pos = this.company.findIndex(c => c.id === originalCompany.id);
        if (pos < 0) {
            return;
        }
        newCompany.id = originalCompany.id;
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        this.http.put(`http://localhost:3000/companies/${originalCompany.id}`, newCompany, { headers: headers })
        .subscribe(
            (response) => {
                this.company[pos] = newCompany;
                this.companyChangedEvent.emit(this.company.slice());
            }
        );
    }

    deleteCompany(company: Company) {
        if (!company || company === undefined) {
            return;
        }
        const pos = this.company.findIndex(c => c.id === company.id);
        if (pos < 0) {
            return;
        }
        this.http.delete(`http://localhost:3000/companies/${company.id}`)
        .subscribe(
            (response) => {
                this.company.splice(pos, 1);
                this.companyChangedEvent.emit(this.company.slice());
            }
        );
    }
}