import { GenericModel } from "./generic.model";
import { UserRole } from "./user.model";

export class Event extends GenericModel {
    id!: number;
    username!: string;
    role!: UserRole;
    action!: EventAction;
    screen!: EventScreen;
    message!: string;
    timestamp!: Date;
}

export enum EventAction {
    ALL = 'ALL',
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    GET = 'GET',
    GET_ALL = 'GET_ALL',
    VOTE = 'VOTE',
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    REGISTER = 'REGISTER',
}

export enum EventScreen {
    ALL = 'ALL',
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
    ELECTIONS = 'ELECTIONS',
    CANDIDATES = 'CANDIDATES',
    VOTE = 'VOTE',
    RESULTS = 'RESULTS',
    SETTINGS = 'SETTINGS',
}
