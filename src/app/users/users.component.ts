import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { Paging } from '../model/paging.model';
import { User } from '../model/user.model';
import { UsersService } from '../services/users.service';
import { AddUserComponent } from './add/add-user.modal';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users: User[] = [];

  filter = new User();
  paging = new Paging();
  totalUsers = 0;

  filterChangedSubject: Subject<string> = new Subject<string>();
  filterChangedSubscription!: Subscription;

  constructor(
    private service: UsersService,
    private modalService: NgbModal,
  ) {
    this.debounceSubscription();
    this.reloadPage();
  }

  reloadPage() {
    this.getFiltered().subscribe();
  }

  resetFilter() {
    this.filter = new User();
    this.paging.page = 1;
    this.reloadPage();
  }

  onPageChange($event: number) {
    this.paging.page = $event;
    this.reloadPage();
  }

  add() {
    const modalref = this.modalService.open(AddUserComponent);

    modalref.result.then((res: User) => {
      if (null != res.id) {
        this.resetFilter();
      }
    })
  }

  delete(id: number) {
    return this.service.delete(id).subscribe((res) => {
      if (res) {
        this.resetFilter();
      }
    });
  }

  getFiltered() {
    return this.service.getFiltered(this.filter, this.paging).pipe(map((res) => {
      if (res?.users) {
        this.users = User.fromArray(res.users);
        this.totalUsers = res.total;
      }
    }));
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
