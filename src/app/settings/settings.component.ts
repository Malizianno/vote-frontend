import { Component } from '@angular/core';
import { map } from 'rxjs';
import { Candidate, CandidateWithStatistics } from '../model/candidate.model';
import { Totals } from '../model/dashboard-totals.model';
import { DashboardService } from '../services/dashboard.service';
import { ElectionHelperService } from '../services/elections-helper.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  totals = new Totals();
  electionEnabled = false;

  candidatesWithStatistics: CandidateWithStatistics[] = [];
  winnerCandidate!: Candidate;

  fakeUsersNo = 0;
  fakeVotesNo = 0;
  votesCount = 0;

  successAlert = '';
  failedAlert = '';
  idleAlert = '';

  constructor(
    private service: DashboardService,
    private electionHelper: ElectionHelperService
  ) {
    this.reloadPage();
  }

  reloadPage() {
    this.getTotals().subscribe();
    this.getElectionStatus().subscribe();

    this.countAllVotes();
    this.getParsedVotes();
  }

  getVotesPercentage(id: number): number | undefined {
    var totalVotes = 0;
    var idVotes = 0;

    for (let candidate of this.candidatesWithStatistics) {
      totalVotes += candidate.totalVotes;

      if (candidate.id === id) {
        idVotes = candidate.totalVotes;
      }
    }

    // console.log('totalVotes calculated: ', totalVotes);

    return idVotes / totalVotes;
  }

  getTotals() {
    return this.service.getTotals().pipe(
      map((res) => {
        if (res) {
          this.totals = res;
        }
      })
    );
  }

  getElectionStatus() {
    return this.electionHelper.status().pipe(
      map((res: boolean) => {
        this.electionEnabled = res;
        // console.log('got electionEnabled: ', res);
      })
    );
  }

  generateFakeUsers() {
    return this.service.fakeUsers(this.fakeUsersNo).subscribe({
      next: (res) => {
        if (res) {
          this.successAlert =
            'generated ' + this.fakeUsersNo + ' users successfully!';
          this.reloadPage();
        } else {
          this.failedAlert =
            'Failed to generate ' + this.fakeUsersNo + ' fake users!';
        }
      },
      error: (error) => {
        this.failedAlert =
          'Error occurred while generating fake users! ' + error;
      },
    });
  }

  generateFakeVotes() {
    return this.service.fakeVotes(this.fakeVotesNo).subscribe({
      next: (res) => {
        if (res) {
          this.successAlert =
            'generated ' +
            this.fakeVotesNo +
            ' votes by admin user successfully!';
          this.reloadPage();
        } else {
          this.failedAlert =
            'Failed to generate ' + this.fakeVotesNo + ' fake votes!';
        }
      },
      error: (error) => {
        this.failedAlert =
          'Error occurred while generating fake votes! ' + error;
      },
    });
  }

  generateFakeCandidates() {
    return this.service.fakeCandidates().subscribe({
      next: (res) => {
        if (res) {
          this.successAlert = 'generated candidates successfully!';
          this.reloadPage();
        } else {
          this.failedAlert = 'Failed to generate candidates!';
        }
      },
      error: (error) => {
        this.failedAlert =
          'Error occurred while generating fake votes! ' + error;
      },
    });
  }

  switchElectionStatus() {
    return this.electionHelper.switchStatus().subscribe({
      next: (res: boolean) => {
        if (res) {
          // console.log('Successfully enabled / disabled Election Status: ', res);
          this.successAlert = 'Election status changed successfully!';
          this.reloadPage();
        } else {
          this.failedAlert = 'Failed to change election status!';
        }
      },
      error: (error) => {
        this.failedAlert =
          'Error occurred while changing election status! ' + error;
      },
    });
  }

  countAllVotes() {
    return this.electionHelper.countAllVotes().subscribe({
      next: (res: number) => {
        if (res) {
          this.votesCount = res;
          // this.reloadPage();
        }
      },
      error: (error) => {
        this.failedAlert = 'Error occurred while counting votes! ' + error;
      },
    });
  }

  cleanElectionDB() {
    return this.electionHelper.cleanDB().subscribe({
      next: (res: boolean) => {
        if (res) {
          // console.log('Successfully cleaned votes DB! Carefull with this! ', res);
          this.successAlert = 'Votes DB cleaned successfully!';
          this.votesCount = 0;
        } else {
          this.failedAlert = 'Failed to clean votes DB!';
        }
      },
      error: (error) => {
        this.failedAlert = 'Error occurred while cleaning votes DB! ' + error;
      },
    });
  }

  getVotingResult() {
    return this.electionHelper.voteResult().subscribe((res: Candidate) => {
      if (res) {
        this.winnerCandidate = res;
        // console.log('got winnerCandidate: ', res);
      }
    });
  }

  getParsedVotes() {
    return this.electionHelper
      .getParsedVotes()
      .subscribe((res: CandidateWithStatistics[]) => {
        if (res) {
          this.candidatesWithStatistics =
            CandidateWithStatistics.fromArray(res);
          this.candidatesWithStatistics.sort(
            (a, b) => b.totalVotes - a.totalVotes
          );
          // console.log('got parsed results: ', this.candidatesWithStatistics);
        }
      });
  }
}
