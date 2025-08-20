import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsService } from './services/credentials.service';
import { LanguageService } from './@shared/i18n/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'vote-frontend';

  constructor(
    private router: Router,
    private credentials: CredentialsService,
    private translate: LanguageService,
  ) {
    this.translate.init();
  }

  get username(): string | undefined {
    return this.credentials.credentials?.username;
  }

  isAuthenticated(): boolean {
    return this.credentials.isAuthenticated();
  }

  logout() {
    this.credentials.setCredentials();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
