import { Component } from '@angular/core';
import { Totals } from '../model/dashboard-totals.model';
import { DashboardService } from '../services/dashboard.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  totals = new Totals();

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
}
