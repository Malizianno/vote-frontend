import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate, CandidateWithStatistics } from '../model/candidate.model';
import { AppConstants } from '../util/app-constants.util';

@Injectable({
  providedIn: 'root',
})
export class ElectionHelperService {
  private apiURL = AppConstants.BASE_URL + '/election/helper';

  constructor(private http: HttpClient) {}

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
    return this.http.get<CandidateWithStatistics[]>(
      this.apiURL + '/getParsedVotes',
      {}
    );
  }
}
