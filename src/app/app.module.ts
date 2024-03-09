import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { UsersComponent } from './users/users.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddCandidateComponent } from './candidates/add/add-candidate.modal';
import { AddUserComponent } from './users/add/add-user.modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CandidateInfoComponent } from './components/candidate-info/candidate-info.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CandidatesComponent,
    UsersComponent,
    NotFoundComponent,
    AddCandidateComponent,
    AddUserComponent,
    CandidateInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
  ],
  exports: [
    CandidateInfoComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
