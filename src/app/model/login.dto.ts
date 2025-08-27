import { UserRole } from "./user.model";

export class LoginRequestDTO {
    username!: string;
    password!: string;
    role!: UserRole;
}

export class LoginResponseDTO {
    username!: string;
    token!: string;
    role!: UserRole;
}

export class LogoutRequestDTO {
    username!: string;
}

export class LogoutResponseDTO {
    username!: string;
    response!: boolean;
}