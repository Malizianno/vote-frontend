import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs';
import { Event, EventAction, EventScreen } from '../model/event.model';
import { Paging } from '../model/paging.model';
import { UserRole } from '../model/user.model';
import { EventsService } from '../services/events.service';
import { DateUtil } from '../util/date.util';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent {
  actions = Object.keys(EventAction).filter((v) => isNaN(Number(v)));
  screens = Object.keys(EventScreen).filter((v) => isNaN(Number(v)));
  roles = Object.keys(UserRole).filter((v) => isNaN(Number(v)));

  events: Event[] = [];

  filter = new Event();
  paging = new Paging();
  totalEvents = 0;

  filterChangedSubject: Subject<string> = new Subject<string>();
  filterChangedSubscription!: Subscription;

  constructor(private service: EventsService, private modalService: NgbModal) {
    this.debounceSubscription();
    this.reloadPage();
  }

  reloadPage() {
    this.getFiltered().subscribe();
  }

  resetFilter() {
    this.filter = new Event();
    this.paging.page = 1;
    this.reloadPage();
  }

  onPageChange($event: number) {
    this.paging.page = $event;
    this.reloadPage();
  }

  delete(id: number) {
    return this.service.delete(id).subscribe((res) => {
      if (res) {
        this.resetFilter();
      }
    });
  }

  getFiltered() {
    return this.service.getFiltered(this.filter, this.paging).pipe(
      map((res) => {
        if (res?.events) {
          this.events = Event.fromArray(res.events);
          this.totalEvents = res.total;
        }
      })
    );
  }

  isDateValid(date: any): boolean {
    return DateUtil.isDateValid(date);
  }

  setActionForFilter(action: any) {
    this.filter.action = action as EventAction;
    this.paging.page = 1; // reset to first page
    this.reloadPage();
  }

  setScreenLocationForFilter(screen: any) {
    this.filter.screen = screen as EventScreen;
    this.paging.page = 1; // reset to first page
    this.reloadPage();
  }

  setRoleForFilter(role: string) {
    this.filter.role = role as UserRole;
    this.paging.page = 1; // reset to first page
    this.reloadPage();
  }

  private debounceSubscription() {
    this.filterChangedSubscription = this.filterChangedSubject
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(() => {
        this.paging.page = 1; // reset to first page
        this.reloadPage();
      });
  }
}
