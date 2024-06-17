import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { User, UserRole } from "src/app/model/user.model";
import { UsersService } from "src/app/services/users.service";

@Component({
    selector: 'app-add-user-modal',
    templateUrl: './add-user.modal.html',
    styleUrls: ['./add-user.modal.scss'],
})
export class AddUserComponent {
    user = new User();
    allRoles: UserRole[] = [UserRole.ADMIN, UserRole.VOTANT];

    constructor(
        private service: UsersService,
        public activeModal: NgbActiveModal,
    ) {
        // empty
    }

    save() {
        this.service.add(this.user).subscribe((res: User) => {
            if (res) {
                this.activeModal.close(res);
            } else {
                this.activeModal.close('responseBody null');
            }
        })
    }

    selectUserRole(role: UserRole) {
        this.user.role = role;
    }

    canSave() {
        return !!this.user && this.user.username && this.user.password && this.user.role;
    }
}