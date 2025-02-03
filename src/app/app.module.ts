import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorHandlerInterceptor } from './@shared/http/error-handler.interceptor';
import { JwtInterceptor } from './@shared/http/jwt.interceptor';
import { RouteReusableStrategy } from './@shared/route-reusable-strategy';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCandidateComponent } from './candidates/add/add-candidate.modal';
import { CandidatesComponent } from './candidates/candidates.component';
import { CandidateInfoComponent } from './components/candidate-info/candidate-info.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddUserComponent } from './users/add/add-user.modal';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';

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
  ],
  exports: [
    CandidateInfoComponent,
  ],
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
  bootstrap: [AppComponent]
})
export class AppModule { }
