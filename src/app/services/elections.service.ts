import { Injectable } from "@angular/core";
import { AppConstants } from "../util/app-constants.util";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Candidate, CandidateWithStatistics } from "../model/candidate.model";

@Injectable({
    providedIn: 'root'
})
export class ElectionService {
    private apiURL = AppConstants.BASE_URL + '/election';

    constructor(private http: HttpClient) { }

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

    countAllVotes(): Observable<number> {
        return this.http.get<number>(this.apiURL + '/countAllVotes', {});
    }

    getParsedVotes(): Observable<CandidateWithStatistics[]> {
        return this.http.get<CandidateWithStatistics[]>(this.apiURL + '/getParsedVotes', {});
    }
}