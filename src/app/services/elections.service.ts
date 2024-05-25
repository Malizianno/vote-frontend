import { Injectable } from "@angular/core";
import { AppConstants } from "../util/app-constants.util";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Candidate } from "../model/candidate.model";

@Injectable({
    providedIn: 'root'
})
export class ElectionService {
    private apiURL = AppConstants.BASE_URL + '/election';

    constructor(private http: HttpClient) { }

    // WIP: remove this because it's only for mobile
    // vote(candidate: Candidate): Observable<boolean> {
    //     return this.http.post<boolean>(this.apiURL + '/vote', candidate, {});
    // }

    voteResult(): Observable<Candidate> {
        return this.http.get<Candidate>(this.apiURL + '/result', {});
    }

    status(): Observable<boolean> {
        return this.http.get<boolean>(this.apiURL + '/status', {});
    }

    switchStatus(): Observable<boolean> {
        return this.http.get<boolean>(this.apiURL + '/switchStatus', {});
    }

    cleanDB(): Observable<boolean> {
        return this.http.get<boolean>(this.apiURL + '/cleanDB', {});
    }
}