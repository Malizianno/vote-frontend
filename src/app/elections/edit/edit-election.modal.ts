import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Election } from 'src/app/model/election.model';
import { ElectionService } from 'src/app/services/elections.service';
import { DateUtil } from 'src/app/util/date.util';

@Component({
  selector: 'app-edit-election-modal',
  templateUrl: './edit-election.modal.html',
  styleUrls: ['./edit-election.modal.scss'],
})
export class EditElectionComponent implements OnInit {
  id = 0; // used to get the election by ID (default)
  election = new Election();

  today: NgbDateStruct = DateUtil.formatDateToNgbStruct(new Date());
  startDate: NgbDateStruct = DateUtil.DEFAULT_DATE;
  endDate: NgbDateStruct = DateUtil.DEFAULT_DATE;

  constructor(
    private service: ElectionService,
    public activeModal: NgbActiveModal
  ) {
    // empty contructor
  }

  ngOnInit(): void {
    this.getElectionByID(this.id);
  }

  getElectionByID(id: number) {
    this.service.getOne(id).subscribe((res: Election) => {
      if (res) {
        this.election = res;

        this.startDate = DateUtil.formatDateToNgbStruct(
          this.election.startDate
        );
        this.endDate = DateUtil.formatDateToNgbStruct(this.election.endDate);
      } else {
        this.activeModal.close('responseBody null');
      }
    });
  }

  updateStartDate(date: NgbDateStruct) {
    if (DateUtil.isNgbDateValid(date)) {
      this.startDate = date;
      this.election.startDate = DateUtil.formatNgbStructToDate(date);
    }
  }

  updateEndDate(date: NgbDateStruct) {
    if (DateUtil.isNgbDateValid(date)) {
      this.endDate = date;
      this.election.endDate = DateUtil.formatNgbStructToDate(date);
    }
  }

  save() {
    this.service.add(this.election).subscribe((res: Election) => {
      if (res) {
        this.activeModal.close(res);
      } else {
        this.activeModal.close('responseBody null');
      }
    });
  }

  canSave() {
    return (
      !!this.election &&
      this.election.name &&
      this.election.enabled != null &&
      this.election.description &&
      this.election.startDate
    );
  }
}
