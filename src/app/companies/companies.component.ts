import { Component, OnInit } from '@angular/core';
import { Company } from './company.model';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css'
})
export class CompaniesComponent implements OnInit {
  selectedCompany : Company;

  constructor(private companyService: CompanyService) { }

  
  ngOnInit() {
    this.companyService.companySelectedEvent.subscribe(
      (company: Company) => {
        this.selectedCompany = company;
      }
    );
  }
}
