import { Injectable } from "@angular/core";
import { AppConstants } from "../util/app-constants.util";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Candidate } from "../model/candidate.model";

@Injectable({
    providedIn: 'root'
})
export class CandidateService {
    private apiURL = AppConstants.BASE_URL + '/candidates';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Candidate[]> {
        return this.http.get<Candidate[]>(this.apiURL + '/all', {});
    }
}