import { Component } from '@angular/core';
import { map } from 'rxjs';
import { Totals } from '../model/dashboard-totals.model';
import { DashboardService } from '../services/dashboard.service';
import { ElectionService } from '../services/elections.service';
import { Candidate } from '../model/candidate.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  totals = new Totals();
  electionEnabled = false;

  winnerCandidate!: Candidate;

  fakeCandidatesNo = 0;
  fakeUsersNo = 0;

  response = "";

  constructor(
    private service: DashboardService,
    private election: ElectionService,
  ) {
    this.reloadPage();
  }

  reloadPage() {
    this.getTotals().subscribe();
    this.getElectionStatus().subscribe();
  }

  getTotals() {
    return this.service.getTotals().pipe(map((res) => {
      if (res) {
        this.totals = res;
      }
    }));
  }

  getElectionStatus() {
    return this.election.status().pipe(map((res: boolean) => {
      this.electionEnabled = res;
      console.log("got electionEnabled: ", res);
    }));
  }


  generateFakeUsers() {
    return this.service.fakeUsers(this.fakeUsersNo).subscribe((res) => {
      if (res) {
        this.response = 'generated ' + this.fakeUsersNo + ' users successfully!';
        this.reloadPage();
      }
    });
  }

  generateFakeCandidates() {
    return this.service.fakeCandidates(this.fakeCandidatesNo).subscribe((res) => {
      if (res) {
        this.response = 'generated ' + this.fakeCandidatesNo + ' candidates successfully!';
        this.reloadPage();
      }
    });
  }

  switchElectionStatus() {
    return this.election.switchStatus().subscribe((res: boolean) => {
      if (res) {
        console.log('Successfully enabled / disabled Election Status: ', res);
      }
    });
  }

  cleanElectionDB() {
    return this.election.cleanDB().subscribe((res: boolean) => {
      if (res) {
        console.log('Successfully cleaned votes DB! Carefull with this! ', res);
      }
    });
  }

  getVotingResult() {
    return this.election.voteResult().subscribe((res: Candidate) => {
      if (res) {
        this.winnerCandidate = res;
        console.log("got winnerCandidate: ", res);
      }
    });
  }
}
