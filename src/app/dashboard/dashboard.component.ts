import { Component } from '@angular/core';
import { map } from 'rxjs';
import { Candidate, CandidateWithStatistics } from '../model/candidate.model';
import { Totals } from '../model/dashboard-totals.model';
import { CandidateService } from '../services/candidates.service';
import { DashboardService } from '../services/dashboard.service';
import { ElectionService } from '../services/elections.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  totals = new Totals();
  electionEnabled = false;

  candidatesWithStatistics: CandidateWithStatistics[] = [];
  winnerCandidate!: Candidate;

  fakeUsersNo = 0;
  fakeVotesNo = 0;
  votesCount = 0;

  response = "";

  constructor(
    private service: DashboardService,
    private election: ElectionService,
    private candidates: CandidateService,
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
    return this.service.getTotals().pipe(map((res) => {
      if (res) {
        this.totals = res;
      }
    }));
  }

  getElectionStatus() {
    return this.election.status().pipe(map((res: boolean) => {
      this.electionEnabled = res;
      // console.log('got electionEnabled: ', res);
    }));
  }

  countAllVotes() {
    return this.election.countAllVotes().subscribe((res: number) => {
      if (res) {
        this.votesCount = res;
        // this.reloadPage();
      }
    });
  }

  getVotingResult() {
    return this.election.voteResult().subscribe((res: Candidate) => {
      if (res) {
        this.winnerCandidate = res;
        // console.log('got winnerCandidate: ', res);
      }
    });
  }

  getParsedVotes() {
    return this.election.getParsedVotes().subscribe((res: CandidateWithStatistics[]) => {
      if (res) {
        this.candidatesWithStatistics = CandidateWithStatistics.fromArray(res);
        this.candidatesWithStatistics.sort((a, b) => b.totalVotes - a.totalVotes);
        // console.log('got parsed results: ', this.candidatesWithStatistics);
      }
    });
  }

  getTotalVotesPercentage(): number {
    if (this.totals.users === 0) {
      return 0;
    }

    return this.votesCount / this.totals.users;
  }
}
