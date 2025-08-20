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
    GET_FILTERED = 'GET_FILTERED',
    COUNT_FILTERED = 'COUNT_FILTERED',
    GET_LAST_10 = 'GET_LAST_10',
    VOTE = 'VOTE',
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    REGISTER = 'REGISTER',
}

export enum EventScreen {
    ALL = 'ALL',
    LOGIN = 'LOGIN',
    DASHBOARD = 'DASHBOARD',
    USERS = 'USERS',
    REGISTER = 'REGISTER',
    ELECTIONS = 'ELECTIONS',
    ELECTIONS_HELPER = 'ELECTIONS_HELPER',
    CANDIDATES = 'CANDIDATES',
    VOTE = 'VOTE',
    RESULTS = 'RESULTS',
    SETTINGS = 'SETTINGS',
}
