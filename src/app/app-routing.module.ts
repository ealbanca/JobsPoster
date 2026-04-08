
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompaniesComponent } from './companies/companies.component';
import { CompanyDetailComponent } from './companies/company-detail/company-detail.component';
import { CompanyEditComponent } from './companies/company-edit/company-edit.component';
import { CompanyStartComponent } from './companies/company-start/company-start.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';


const appRoutes: Routes = [
    {path: '', redirectTo: '/companies', pathMatch: 'full'},
    {path: 'companies', component: CompaniesComponent, children: [
        {path: 'new', component: CompanyEditComponent},
        {path: ':id', component: CompanyDetailComponent},
        {path: ':id/edit', component: CompanyEditComponent}
    ]
    },
    {path: 'jobs', component: JobsListComponent, children: [
        {path: ':id', component: CompanyDetailComponent},
        {path: ':id/edit', component: CompanyEditComponent},
        {path: 'new', component: CompanyEditComponent}
    ]
    },

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
