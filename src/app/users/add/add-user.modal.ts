import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { User } from "src/app/model/user.model";
import { UsersService } from "src/app/services/users.service";

@Component({
    selector: 'app-add-user-modal',
    templateUrl: './add-user.modal.html',
    styleUrls: ['./add-user.modal.scss'],
})
export class AddUserComponent {
    user = new User();

    constructor(
        private service: UsersService,
        public activeModal: NgbActiveModal,
    ) { }

    save() {
        this.service.add(this.user).subscribe((res: User) => {
            if (res) {
                this.activeModal.close(res);
            } else {
                this.activeModal.close('responseBody null');
            }
        })
    }

    canSave() {
        return !!this.user && this.user.username;
    }
}