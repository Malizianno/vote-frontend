import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
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

  constructor(
    private service: UsersService,
    private modalService: NgbModal,
  ) {
    this.reloadPage();
  }

  reloadPage() {
    this.getAll().subscribe();
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

  getAll() {
    return this.service.getAll().pipe(map((res) => {
      if (res) {
        this.users = User.fromArray(res);
      }
    }));
  }
}
