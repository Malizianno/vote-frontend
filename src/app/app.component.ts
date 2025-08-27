import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsService } from './services/credentials.service';
import { LanguageService } from './@shared/i18n/language.service';
import { LoginService } from './services/login.service';
import { LogoutRequestDTO } from './model/login.dto';

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
    private loginService: LoginService
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
    const dto = new LogoutRequestDTO();
    dto.username = this.username || '';

    this.loginService.logout(dto).subscribe({
      next: (res) => {
        console.log('logout response: ', res);
      },
      error: (err) => {
        console.error('logout error: ', err);
      },
    });

    this.credentials.setCredentials();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
