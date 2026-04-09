import { Injectable, EventEmitter} from "@angular/core";
import { Subject } from "rxjs";
import{ HttpClient, HttpHeaders } from "@angular/common/http";

import { Company } from "./company.model";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
    companyListChangedEvent = new Subject<Company[]>();
    companySelectedEvent = new EventEmitter<Company>();
    companies: Company[] = [];
    companyChangedEvent = new EventEmitter<Company[]>();
    maxCompanyId: number;

    constructor(private http: HttpClient) { 
        this.companies = []; // Initialize with empty array
        this.maxCompanyId = this.getMaxId();
    }

    /*storeCompanies() {
        const companies = JSON.stringify(this.companies);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        this.http.put(
            'https://cms-project-fca75-default-rtdb.firebaseio.com/companies.json',
            companies,
            { headers: headers }
        ).subscribe(
            () => {
                this.companyListChangedEvent.next(this.companies.slice());
            },
            (error) => {
                console.error('Error storing companies to server:', error);
            }
        );
    }*/

    getCompanies() {
        return this.http.get<Company[]>('http://localhost:3000/companies');
    }

    getCompany(id: string) {
        return this.http.get<Company>(`http://localhost:3000/companies/${id}`);
    }

    getMaxId(): number {
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
        if (!company) {
            return;
        }
        company.id = '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        // add to database
        this.http.post<{ message: string, company: Company }>(
            'http://localhost:3000/companies',
            company,
            { headers: headers })
            .subscribe(
                (responseData) => {
                    this.companies.push(responseData.company);
                    this.sortAndSend();
                }
            );
    }

    updateCompany(originalCompany: Company, newCompany: Company) {
        if (!originalCompany || !newCompany) {
            return;
        }
        const pos = this.companies.findIndex(c => c.id === originalCompany.id);
        if (pos < 0) {
            return;
        }
        newCompany.id = originalCompany.id;
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        this.http.put(
            'http://localhost:3000/companies/' + originalCompany.id,
            newCompany,{ headers: headers })
            .subscribe(
                (response: any) => {
                    this.companies[pos] = newCompany;
                    this.sortAndSend();
                }
            );
    }

    deleteCompany(company: Company) {
        if (!company || company === undefined) {
            return;
        }
        this.http.delete('http://localhost:3000/companies/' + company.id)
            .subscribe((response: any) => {
                // After deletion, fetch the updated list from backend
                this.getCompanies().subscribe((res: any) => {
                    this.companies = res.companies ? res.companies : res;
                    this.sortAndSend();
                });
            });
    }
    public sortAndSend() {
        this.companies.sort((a, b) => a.name.localeCompare(b.name));
        this.companyListChangedEvent.next(this.companies.slice());
    }

}
