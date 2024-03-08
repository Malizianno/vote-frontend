import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Candidate } from "src/app/model/candidate.model";
import { CandidateService } from "src/app/services/candidates.service";

@Component({
    selector: 'app-add-candidate-modal',
    templateUrl: './add-candidate.modal.html',
    styleUrls: ['./add-candidate.modal.scss'],
})
export class AddCandidateComponent {
    candidate = new Candidate();

    constructor(
        private service: CandidateService,
        public activeModal: NgbActiveModal,
    ) { }

    save() {
        this.service.add(this.candidate).subscribe((res: Candidate) => {
            if (res) {
                this.activeModal.close(res);
            } else {
                this.activeModal.close('responseBody null');
            }
        })
    }

    canSave() {
        return !!this.candidate &&
            this.candidate.firstName &&
            this.candidate.lastName &&
            this.candidate.party &&
            this.candidate.image &&
            this.candidate.description;
    }
}