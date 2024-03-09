import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { User } from '../model/user.model';
import { UsersService } from '../services/users.service';
import { AddUserComponent } from './add/add-user.modal';
import { Paging } from '../model/paging.model';

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

  constructor(
    private service: UsersService,
    private modalService: NgbModal,
  ) {
    this.reloadPage();
  }

  reloadPage() {
    this.getFiltered().subscribe();
  }

  onPageChange($event: number) {
    this.paging.page = $event;
    this.reloadPage();
  }

  add() {
    const modalref = this.modalService.open(AddUserComponent);

    modalref.result.then((res: User) => {
      if (null != res.id) {
        console.log('user ' + res.id + ' was saved successfully!');
        this.reloadPage();
      }
    })
  }

  delete(id: number) {
    return this.service.delete(id).subscribe((res) => {
      if (res) {
        console.log('User ' + id + ' deleted successfully!');
        this.reloadPage();
      }
    });
  }

  getFiltered() {
    return this.service.getFiltered(this.filter, this.paging).pipe(map((res) => {
      if (res?.users) {
        this.users = User.fromArray(res.users);
        this.totalUsers = res.total;
        // console.log('users: ', this.users);
        // console.log('total users: ', this.totalUsers);
      }
    }));
  }
}
