import {
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  ArcElement,
  Chart,
  DoughnutController,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';
import { map } from 'rxjs';
import { ElectionCampaignDTO } from '../model/campaign.model';
import { Candidate, CandidateWithStatistics } from '../model/candidate.model';
import { Totals } from '../model/dashboard-totals.model';
import { Election } from '../model/election.model';
import { Event } from '../model/event.model';
import { DashboardService } from '../services/dashboard.service';
import { DataService } from '../services/data.service';
import { ElectionHelperService } from '../services/elections-helper.service';
import { EventsService } from '../services/events.service';
import { DateUtil } from '../util/date.util';
import { PartyTypeEnum } from '../util/party-type.enum';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Title);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnChanges, OnDestroy {
  totals = new Totals();
  electionEnabled = false;
  selectedElection: Election = new Election();

  last10Events: Event[] = [];
  candidatesWithStatistics: CandidateWithStatistics[] = [];
  winnerCandidate!: Candidate;

  fakeUsersNo = 0;
  fakeVotesNo = 0;
  votesCount = 0;

  response = '';

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  constructor(
    private service: DashboardService,
    private electionHelper: ElectionHelperService,
    private events: EventsService,
    private dataService: DataService
  ) {
    this.reloadPage();
  }

  ngOnInit() {
    this.dataService.selectedElection$.subscribe((election) => {
      if (election.id > 0) {
        this.selectedElection = election;

        this.reloadPage();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // compute chart after data is here ;)
    if (this.isDataReadyForChart()) {
      this.loadChart();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  reloadPage() {
    if (this.selectedElection.id > 0) {
      this.getElectionStatus().subscribe((res) => {
        this.getTotals().subscribe((res) => {
          this.countAllVotes().subscribe((res) => {
            this.getParsedVotes();

            // compute chart after data is here ;)
            if (this.isDataReadyForChart()) {
              this.loadChart();
            }
          });
        });
      });

      this.loadLast10Events();
    }
  }

  isDataReadyForChart(): boolean {
    // console.log(
    //   'results ',
    //   this.votesCount > 0 && this.totals && this.totals.users > 0
    // );
    return this.votesCount > 0 && this.totals && this.totals.users > 0;
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
    return this.service.getTotals(this.selectedElection.id).pipe(
      map((res) => {
        if (res) {
          this.totals = res;
        }
      })
    );
  }

  getElectionStatus() {
    return this.electionHelper.status().pipe(
      map((res: ElectionCampaignDTO) => {
        this.electionEnabled = res.enabled;
        // console.log('got electionEnabled: ', res);
      })
    );
  }

  countAllVotes() {
    return this.electionHelper.countAllVotes(this.selectedElection!.id).pipe(
      map((res: number) => {
        if (res) {
          this.votesCount = res;
          // this.reloadPage();
        }
      })
    );
  }

  getVotingResult() {
    return this.electionHelper
      .voteResult(this.selectedElection!.id)
      .subscribe((res: Candidate) => {
        if (res) {
          this.winnerCandidate = res;
          // console.log('got winnerCandidate: ', res);
        }
      });
  }

  getParsedVotes() {
    return this.electionHelper
      .getParsedVotes(this.selectedElection!.id)
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

  isDateValid(date: any): boolean {
    return DateUtil.isDateValid(date);
  }

  isTheCandidateIND(candidate: Candidate): boolean {
    return PartyTypeEnum[candidate.party] == '' + PartyTypeEnum.IND;
  }

  loadLast10Events() {
    return this.events.getLast10().subscribe((res: Event[]) => {
      if (res) {
        this.last10Events = Event.fromArray(res);
      }
    });
  }
}
