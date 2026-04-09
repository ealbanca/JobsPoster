import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import  { Company } from '../../company.model';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.css']
})
export class CompanyItemComponent implements OnInit {
  @Input() company: Company;
  @Output() companySelected = new EventEmitter<void>();
  constructor() { }

  ngOnInit(){
  }

  onSelectedCompany() {
    this.companySelected.emit();
  }
}