import { Component } from '@angular/core';
import { map } from 'rxjs';
import { Totals } from '../model/dashboard-totals.model';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  totals = new Totals();

  fakeCandidatesNo = 0;
  fakeUsersNo = 0;

  response = "";

  constructor(private service: DashboardService,) {
    this.reloadPage();
  }

  reloadPage() {
    this.getTotals().subscribe();
  }

  getTotals() {
    return this.service.getTotals().pipe(map((res) => {
      if (res) {
        this.totals = res;
      }
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
}
