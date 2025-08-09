import { GenericModel } from "./generic.model";
import { User } from "./user.model";

export class UserResponse extends GenericModel {
    users!: User[];
    total!: number;
    adminUsersCount!: number;
    votantUsersCount!: number;
}