import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequestDTO, LoginResponseDTO } from '../model/login.dto';
import { UserRole } from '../model/user.model';
import { CredentialsService } from '../services/credentials.service';
import { LoginService } from '../services/login.service';
import { environment } from 'src/environments/environment';
import { ElectionService } from '../services/elections.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  version = environment.version;
  dto = new LoginRequestDTO();

  constructor(
    private service: LoginService,
    private credentialsService: CredentialsService,
    private router: Router,
    private electionService: ElectionService,
    private dataService: DataService,
  ) {
    this.dto.role = UserRole.ADMIN;
  }

  submit() {
    this.service.login(this.dto).subscribe((res: LoginResponseDTO) => {
      if (res && res.role && res.token && res.username) {
        // console.log('login response: ', res);

        this.credentialsService.setCredentials(res, true);

        // get election list
        this.loadElections();

        this.router.navigate(['/dashboard'], { replaceUrl: true });
      }
    });
  }

  canSubmit(): boolean {
    return !!this.dto && !!this.dto.username && !!this.dto.password;
  }

  loadElections() {
    this.electionService.getAll().subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.dataService.emitElectionList(res);
          // console.log('loaded elections: ', res);
        }
      },
      error: (err) => {
        console.error('loadElections error: ', err);
      },
    });
  }
}
