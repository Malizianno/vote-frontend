import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CandidatesComponent } from './candidates/candidates.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ElectionsComponent } from './elections/elections.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'candidates', component: CandidatesComponent },
  { path: 'elections', component: ElectionsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'events', component: EventsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
