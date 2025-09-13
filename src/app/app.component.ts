import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from './@shared/i18n/language.service';
import { Election } from './model/election.model';
import { LogoutRequestDTO } from './model/login.dto';
import { CredentialsService } from './services/credentials.service';
import { DataService } from './services/data.service';
import { LoginService } from './services/login.service';
import { switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'vote-frontend';

  allElections: Election[] = [];
  selectedElectionObject: Election = new Election();

  constructor(
    private router: Router,
    private credentials: CredentialsService,
    private translate: LanguageService,
    private loginService: LoginService,
    private dataService: DataService
  ) {
    this.translate.init();
  }

  ngOnInit(): void {
    timer(0, 2000)
      .pipe(switchMap(() => this.dataService.electionsList$))
      .subscribe((electionList) => {
        if (electionList) {
          this.allElections = electionList;
        }
      });
  }

  get username(): string | undefined {
    return this.credentials.credentials?.username;
  }

  get selectedElection(): Election | undefined {
    return this.selectedElectionObject.id > 0
      ? this.selectedElectionObject
      : undefined;
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

  selectNewElection(election: Election) {
    this.selectedElectionObject = election;
    this.dataService.emitElection(this.selectedElectionObject);
    // console.log('selected new election: ', election);
  }
}
