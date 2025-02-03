import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequestDTO, LoginResponseDTO } from '../model/login.dto';
import { UserRole } from '../model/user.model';
import { CredentialsService } from '../services/credentials.service';
import { LoginService } from '../services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  version = environment.version;
  dto = new LoginRequestDTO();

  constructor(private service: LoginService, private credentialsService: CredentialsService, private router: Router,) {
    this.dto.role = UserRole.ADMIN;
  }

  submit() {
    this.service.login(this.dto).subscribe((res: LoginResponseDTO) => {
      if (res && res.role && res.token && res.username) {
        // console.log('login response: ', res);

        this.credentialsService.setCredentials(res, true);

        this.router.navigate(['/dashboard'], { replaceUrl: true });
      }
    });
  }

  canSubmit(): boolean {
    return !!this.dto && !!this.dto.username && !!this.dto.password;
  }
}
