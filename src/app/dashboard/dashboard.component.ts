import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { Candidate, CandidateWithStatistics } from '../model/candidate.model';
import { Totals } from '../model/dashboard-totals.model';
import { CandidateService } from '../services/candidates.service';
import { DashboardService } from '../services/dashboard.service';
import { ElectionService } from '../services/elections.service';
import { PartyTypeEnum } from '../util/party-type.enum';
import {
  ArcElement,
  Chart,
  DoughnutController,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Title);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  totals = new Totals();
  electionEnabled = false;

  candidatesWithStatistics: CandidateWithStatistics[] = [];
  winnerCandidate!: Candidate;

  fakeUsersNo = 0;
  fakeVotesNo = 0;
  votesCount = 0;

  response = '';

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  ngOnInit(): void {
    this.reloadPage();
  }

  // ngAfterViewInit(): void {
  //   const ctx = this.chartCanvas.nativeElement.getContext('2d');
  //   console.log('votes count: ', this.votesCount);
  //   console.log('totals.users: ', this.totals.users);

  //   this.chart = new Chart(ctx!, {
  //     type: 'doughnut',
  //     data: {
  //       labels: ['voturi curente', 'voturi totale'],
  //       datasets: [
  //         {
  //           label: 'Statistică voturi',
  //           // data: [this.votesCount, this.totals.users],
  //           data: [35, 74],
  //           backgroundColor: ['rgb(134, 255, 86)', 'rgb(255, 99, 132)'],
  //           hoverOffset: 4,
  //         },
  //       ],
  //     },
  //     options: {
  //       rotation: -90, // Starts at the left
  //       circumference: 180, // Only half the circle
  //       cutout: '70%', // Optional: controls the inner radius
  //       plugins: {
  //         legend: {
  //           display: false, // Hide legend if not needed
  //         },
  //       },
  //     },
  //   });
  // }

  constructor(
    private service: DashboardService,
    private election: ElectionService,
    private candidates: CandidateService
  ) {
    // empty
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  reloadPage() {
    this.getElectionStatus().subscribe(res => {
      this.getTotals().subscribe(res => {
        this.countAllVotes().subscribe(res => {
          this.getParsedVotes();
  
          // compute chart after data is here ;)
          this.loadChart();
        });
      });
    });
  }

  loadChart() {
     const ctx = this.chartCanvas.nativeElement.getContext('2d');
    // console.log('votes count: ', this.votesCount);
    // console.log('totals.users: ', this.totals.users);

    this.chart = new Chart(ctx!, {
      type: 'doughnut',
      data: {
        labels: ['voturi curente', 'voturi rămase'],
        datasets: [
          {
            label: 'Statistică voturi',
            data: [this.votesCount, this.totals.users - this.votesCount],
            // data: [35, 74],
            backgroundColor: ['rgb(134, 255, 86)', 'rgb(255, 99, 132)'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        rotation: -90, // Starts at the left
        circumference: 180, // Only half the circle
        cutout: '70%', // Optional: controls the inner radius
        plugins: {
          legend: {
            display: false, // Hide legend if not needed
          },
        },
      },
    });
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
    return this.election.status().pipe(
      map((res: boolean) => {
        this.electionEnabled = res;
        // console.log('got electionEnabled: ', res);
      })
    );
  }

  countAllVotes() {
    return this.election.countAllVotes().pipe(map((res: number) => {
      if (res) {
        this.votesCount = res;
        // this.reloadPage();
      }
    }));
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
    return this.election
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

  getTotalVotesPercentage(): number {
    if (this.totals.users === 0) {
      return 0;
    }

    return this.votesCount / this.totals.users;
  }

  isTheCandidateIND(candidate: Candidate): boolean {
    return PartyTypeEnum[candidate.party] == '' + PartyTypeEnum.IND;
  }
}
