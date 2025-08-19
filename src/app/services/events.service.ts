import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventResponse } from '../model/event-response.dto';
import { Paging } from '../model/paging.model';
import { AppConstants } from '../util/app-constants.util';
import { Event } from '../model/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private apiURL = AppConstants.BASE_URL + '/events';

  constructor(private http: HttpClient) {}

  getOne(id: number): Observable<Event> {
    return this.http.get<Event>(this.apiURL + `/${id}`, {});
  }

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiURL + '/all', {});
  }

  getLast10(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiURL + '/last10', {});
  }

  getFiltered(event: Event, paging: Paging): Observable<EventResponse> {
    const filter = {
      event,
      paging: { page: paging.page - 1, size: paging.size },
    };

    return this.http.post<EventResponse>(this.apiURL + '/filtered', filter, {});
  }

  add(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiURL + '/add', event, {});
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiURL + `/delete/${id}`, {});
  }
}
