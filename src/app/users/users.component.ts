import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs';
import { Paging } from '../model/paging.model';
import { User, UserRole } from '../model/user.model';
import { UsersService } from '../services/users.service';
import { AddUserComponent } from './add/add-user.modal';
import { EditUserComponent } from './edit/edit-user.modal';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  roles = Object.keys(UserRole).filter((v) => isNaN(Number(v)));
  
  users: User[] = [];

  filter = new User();
  paging = new Paging();
  totalUsers = 0;

  // created only for the purpose of showing in the template
  adminUsersCount = 0;
  votantUsersCount = 0;

  filterChangedSubject: Subject<string> = new Subject<string>();
  filterChangedSubscription!: Subscription;

  constructor(private service: UsersService, private modalService: NgbModal) {
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
    });
  }

  edit(id: number) {
    // open modal to add new candidate
    const modalref = this.modalService.open(EditUserComponent);
    modalref.componentInstance.id = id; // pass the ID to the modal

    modalref.result.then((res: User) => {
      if (null != res.id) {
        this.resetFilter();
      }
    });
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
        if (res?.users) {
          this.users = User.fromArray(res.users);
          this.totalUsers = res.total;

          this.adminUsersCount = res.adminUsersCount;
          this.votantUsersCount = res.votantUsersCount;
        }
      })
    );
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

  private isAdmin(user: User): boolean {
    return user.role && user.role.includes('ADMIN');
  }

  private isVotant(user: User): boolean {
    return user.role && user.role.includes('VOTANT');
  }
}
