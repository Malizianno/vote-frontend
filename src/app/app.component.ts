import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, timer } from 'rxjs';
import { LanguageService } from './@shared/i18n/language.service';
import { Election } from './model/election.model';
import { LogoutRequestDTO } from './model/login.dto';
import { CredentialsService } from './services/credentials.service';
import { DataService } from './services/data.service';
import { ElectionService } from './services/elections.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'vote-frontend';

  allElections: Election[] = [];
  selectedElectionObject: Election = new Election();

  constructor(
    private router: Router,
    private credentials: CredentialsService,
    private translate: LanguageService,
    private loginService: LoginService,
    private dataService: DataService,
    private electionService: ElectionService
  ) {
    this.translate.init();

    this.loadElections();
    this.loadLastActive();
  }

  ngAfterViewInit(): void {
    timer(0, 1000)
      .pipe(switchMap(() => this.dataService.electionsList$))
      .subscribe((electionList: Election[]) => {
        if (electionList) {
          this.allElections = electionList;
        }
      });

    timer(0, 3000)
      .pipe(switchMap(() => this.dataService.selectedElection$))
      .subscribe((active: Election) => {
        if (active) {
          this.selectedElectionObject = active;
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

  loadElections(): void {
    if (this.isAuthenticated()) {
      this.electionService.getAll().subscribe({
        next: (res) => {
          if (res && res.length > 0) {
            this.dataService.emitElectionList(res);
            // console.log('loaded elections: ', res);
          }
        },
        error: (err) => {
          // console.log('loadElections error: ', err);
        },
      });
    }
  }

  loadLastActive(): void {
    if (this.isAuthenticated()) {
      this.electionService.getLastActive().subscribe({
        next: (res) => {
          if (res && res.id) {
            this.dataService.emitElection(res);
            // console.log('loaded active election: ', res);
          }
        },
        error: (err) => {
          console.log('loadLastActiveElection error: not found');
        },
      });
    }
  }
}
