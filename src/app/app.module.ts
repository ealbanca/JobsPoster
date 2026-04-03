import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyDetailComponent } from './companies/company-detail/company-detail.component';
import { CompanyEditComponent } from './companies/company-edit/company-edit.component';
import { CompanyListComponent } from './companies/company-list/company-list.component';
import { CompanyStartComponent } from './companies/company-start/company-start.component';
import { JobsComponent } from './jobs/jobs.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CompaniesComponent,
    CompanyDetailComponent,
    CompanyEditComponent,
    CompanyListComponent,
    CompanyStartComponent,
    JobsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
