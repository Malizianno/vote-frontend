import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User, UserRole } from 'src/app/model/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user.modal.html',
  styleUrls: ['./edit-user.modal.scss'],
})
export class EditUserComponent implements OnInit {
  id = 0; // used to get the user by ID (default)
  user = new User();
  allRoles: UserRole[] = [UserRole.ADMIN, UserRole.VOTANT];

  constructor(
    private service: UsersService,
    public activeModal: NgbActiveModal
  ) {
    // empty constructor
  }

  ngOnInit(): void {
    this.getUserByID(this.id);
  }

  getUserByID(id: number) {
    this.service.getOne(id).subscribe((res: User) => {
      if (res) {
        this.user = res;
        this.user.password = ''; // Clear password for security reasons
      } else {
        this.activeModal.close('responseBody null');
      }
    });
  }

  save() {
    this.service.add(this.user).subscribe((res: User) => {
      if (res) {
        this.activeModal.close(res);
      } else {
        this.activeModal.close('responseBody null');
      }
    });
  }

  selectUserRole(role: UserRole) {
    this.user.role = role;
  }

  canSave() {
    return (
      !!this.user && this.user.username && this.user.password && this.user.role
    );
  }
}
