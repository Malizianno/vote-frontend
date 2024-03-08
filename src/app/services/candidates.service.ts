import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CandidateResponse } from "../model/candidate-response.dto";
import { Candidate } from "../model/candidate.model";
import { Paging } from "../model/paging.model";
import { AppConstants } from "../util/app-constants.util";

@Injectable({
    providedIn: 'root'
})
export class CandidateService {
    private apiURL = AppConstants.BASE_URL + '/candidates';

    constructor(private http: HttpClient) { }

    getOne(id: number): Observable<Candidate> {
        return this.http.get<Candidate>(this.apiURL + `/${id}`, {});
    }

    getAll(): Observable<Candidate[]> {
        return this.http.get<Candidate[]>(this.apiURL + '/all', {});
    }

    getFiltered(candidate: Candidate, paging: Paging): Observable<CandidateResponse> {
        const filter = { candidate, paging };

        return this.http.post<CandidateResponse>(this.apiURL + '/filtered', filter, {});
    }

    add(candidate: Candidate): Observable<Candidate> {
        return this.http.post<Candidate>(this.apiURL + '/add', candidate, {});
    }

    delete(id: number): Observable<boolean> {
        return this.http.delete<boolean>(this.apiURL + `/delete/${id}`, {});
    }
}