import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ElectionRequest,
  ElectionResponse,
} from '../model/election-response.dto';
import { Election } from '../model/election.model';
import { Paging } from '../model/paging.model';
import { AppConstants } from '../util/app-constants.util';

@Injectable({
  providedIn: 'root',
})
export class ElectionService {
  private apiURL = AppConstants.BASE_URL + '/election';

  constructor(private http: HttpClient) {}

  getOne(id: number): Observable<Election> {
    return this.http.get<Election>(this.apiURL + `/${id}`, {});
  }

  getLastActive(): Observable<Election> {
    return this.http.get<Election>(this.apiURL + '/last', {});
  }

  getAll(): Observable<Election[]> {
    return this.http.get<Election[]>(this.apiURL + '/all', {});
  }

  getFiltered(
    election: Election,
    paging: Paging
  ): Observable<ElectionResponse> {
    const filter = {
      election,
      paging: { page: paging.page - 1, size: paging.size },
    };

    return this.http.post<ElectionResponse>(
      this.apiURL + '/filtered',
      filter,
      {}
    );
  }

  add(election: Election): Observable<Election> {
    return this.http.post<Election>(this.apiURL + '/add', election, {});
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiURL + `/delete/${id}`, {});
  }

  changeStatus(id: number, enabled: boolean): Observable<boolean> {
    return this.http.post<boolean>(
      this.apiURL + `/changeStatus/${id}/${enabled}`,
      {}
    );
  }
}
