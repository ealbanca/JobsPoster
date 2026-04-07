import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { CompaniesComponent } from './companies/companies.component';
import { CompanyDetailComponent } from './companies/company-detail/company-detail.component';
import { CompanyEditComponent } from './companies/company-edit/company-edit.component';
import { CompanyListComponent } from './companies/company-list/company-list.component';
import { CompanyStartComponent } from './companies/company-start/company-start.component';
import { CompanyItemComponent } from './companies/company-list/company-item/company-item.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobsEditComponent } from './jobs-list/jobs-edit/jobs-edit.component';

import { JobsListService } from './jobs-list/jobs-list.service';
import { CompanyService } from './companies/company.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CompaniesComponent,
    CompanyDetailComponent,
    CompanyEditComponent,
    CompanyListComponent,
    CompanyStartComponent,
    JobsListComponent,
    JobsEditComponent,
    CompanyItemComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
],
  providers: [CompanyService, JobsListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
