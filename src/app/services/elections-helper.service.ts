import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate, CandidateWithStatistics } from '../model/candidate.model';
import { AppConstants } from '../util/app-constants.util';
import { Election } from '../model/election.model';
import { ElectionCampaignDTO } from '../model/campaign.model';

@Injectable({
  providedIn: 'root',
})
export class ElectionHelperService {
  private apiURL = AppConstants.BASE_URL + '/election/helper';

  constructor(private http: HttpClient) {}

  voteResult(electionId: number): Observable<Candidate> {
    return this.http.get<Candidate>(this.apiURL + `/result/${electionId}`, {});
  }

  status(): Observable<ElectionCampaignDTO> {
    return this.http.get<ElectionCampaignDTO>(this.apiURL + '/status', {});
  }

  cleanDB(electionId: number): Observable<boolean> {
    return this.http.get<boolean>(this.apiURL + `/cleanDB/${electionId}`, {});
  }

  countAllVotes(electionId: number): Observable<number> {
    return this.http.get<number>(this.apiURL + `/countAllVotes/${electionId}`, {});
  }

  getParsedVotes(electionId: number): Observable<CandidateWithStatistics[]> {
    return this.http.get<CandidateWithStatistics[]>(
      this.apiURL + `/getParsedVotes/${electionId}`,
      {}
    );
  }

  lastElection(): Observable<Election> {
    return this.http.get<Election>(this.apiURL + '/lastElection', {});
  }
}
