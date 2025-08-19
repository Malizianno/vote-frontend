import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorHandlerInterceptor } from './@shared/http/error-handler.interceptor';
import { JwtInterceptor } from './@shared/http/jwt.interceptor';
import { RouteReusableStrategy } from './@shared/route-reusable-strategy';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCandidateComponent } from './candidates/add/add-candidate.modal';
import { CandidatesComponent } from './candidates/candidates.component';
import { AlertComponent } from './components/alert/alert.component';
import { CandidateInfoComponent } from './components/candidate-info/candidate-info.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddElectionComponent } from './elections/add/add-election.modal';
import { EditElectionComponent } from './elections/edit/edit-election.modal';
import { ElectionsComponent } from './elections/elections.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SettingsComponent } from './settings/settings.component';
import { AddUserComponent } from './users/add/add-user.modal';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CandidatesComponent,
    ElectionsComponent,
    UsersComponent,
    NotFoundComponent,
    AddCandidateComponent,
    AddElectionComponent,
    EditElectionComponent,
    AddUserComponent,
    CandidateInfoComponent,
    AlertComponent,
    LoginComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    NgbDatepickerModule,
  ],
  exports: [CandidateInfoComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
