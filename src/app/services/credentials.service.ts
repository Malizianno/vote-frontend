import { Injectable } from "@angular/core";
import { LoginResponseDTO } from "../model/login.dto";
import { UserRole } from "../model/user.model";

const credentialsKey = 'credentials';

@Injectable({
    providedIn: 'root',
})
export class CredentialsService {
    private _credentials: LoginResponseDTO | null = null;

  constructor() {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Checks is the user is admin.
   * @return True if the user is admin.
   */
  get isAdmin(): boolean {
    return this.credentials?.role === UserRole.ADMIN;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): LoginResponseDTO | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: LoginResponseDTO, remember?: boolean) {
    this._credentials = credentials || null;

    // console.log('got credentials: ', this._credentials);

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }
}