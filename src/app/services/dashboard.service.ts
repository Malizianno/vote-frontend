import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Totals } from '../model/dashboard-totals.model';
import { AppConstants } from '../util/app-constants.util';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiURL = AppConstants.BASE_URL + '/dashboard';

  constructor(private http: HttpClient) {}

  getTotals(electionID: number): Observable<Totals> {
    return this.http.get<Totals>(this.apiURL + `/totals/${electionID}`, {});
  }
}
