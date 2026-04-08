import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Company } from './company.model';
import {Job} from '../shared/job.model';

@Injectable()
export class CompanyService {
    companiesChanged = new Subject<Company[]>();

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

    updateCompany(id: string, company: Company) {
        return this.http.put<Company>(`http://localhost:3000/companies/${id}`, company);
    }

    deleteCompany(id: string) {
        return this.http.delete(`http://localhost:3000/companies/${id}`);
    }
}