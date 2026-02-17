import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ErrorHandlerInterceptor } from './@shared/http/error-handler.interceptor';
import { JwtInterceptor } from './@shared/http/jwt.interceptor';
import { RouteReusableStrategy } from './@shared/route-reusable-strategy';
import { HttpLoaderFactory } from './@shared/translate-loader.factory';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCandidateComponent } from './candidates/add/add-candidate.modal';
import { CandidatesComponent } from './candidates/candidates.component';
import { EditCandidateComponent } from './candidates/edit/edit-candidate.modal';
import { AlertComponent } from './components/alert/alert.component';
import { CandidateInfoComponent } from './components/candidate-info/candidate-info.component';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { NoSelectedElectionMessageComponent } from './components/no-selected-election-message/no-selected-election-message.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddElectionComponent } from './elections/add/add-election.modal';
import { EditElectionComponent } from './elections/edit/edit-election.modal';
import { ElectionsComponent } from './elections/elections.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SettingsComponent } from './settings/settings.component';
import { AddUserComponent } from './users/add/add-user.modal';
import { EditUserComponent } from './users/edit/edit-user.modal';
import { UsersComponent } from './users/users.component';
import { AddNewsfeedPostComponent } from './newsfeed/add/add-newsfeed-post.modal';
import { EditNewsfeedPostComponent } from './newsfeed/edit/edit-newsfeed-post.modal';
import { NewsfeedPostsComponent } from './newsfeed/newsfeed-post.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CandidatesComponent,
    ElectionsComponent,
    UsersComponent,
    EventsComponent,
    NotFoundComponent,
    AddCandidateComponent,
    EditCandidateComponent,
    AddElectionComponent,
    AddNewsfeedPostComponent,
    EditNewsfeedPostComponent,
    NewsfeedPostsComponent,
    EditElectionComponent,
    AddUserComponent,
    EditUserComponent,
    CandidateInfoComponent,
    NoDataComponent,
    AlertComponent,
    LanguageSwitcherComponent,
    LoginComponent,
    SettingsComponent,
    NoSelectedElectionMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    NgbDatepickerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [CandidateInfoComponent, LanguageSwitcherComponent],
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
