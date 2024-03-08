import { Injectable } from "@angular/core";
import { AppConstants } from "../util/app-constants.util";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Totals } from "../model/dashboard-totals.model";

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private apiURL = AppConstants.BASE_URL + '/dashboard';

    constructor(private http: HttpClient) { }

    getTotals(): Observable<Totals> {
        return this.http.get<Totals>(this.apiURL + '/totals', {});
    }
}