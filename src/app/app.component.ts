import { Component } from '@angular/core';
import { CredentialsService } from './services/credentials.service';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vote-frontend';

  constructor(private router: Router, private loginService: LoginService, private credentials: CredentialsService) {

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
