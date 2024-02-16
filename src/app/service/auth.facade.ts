import {Injectable} from "@angular/core";
import {StoreService} from "./store.service";
import {BehaviorSubject} from "rxjs";
import {SessionService} from "./session.service";
import {UserService} from "./user.service";
import {User} from "../model/user";
import {Session} from "../model/session";

@Injectable({
    providedIn: 'root'
})

export class AuthFacadeService {

    constructor(private storeService: StoreService,
                private sessionService: SessionService,
                private userService: UserService) {
    }

    getIsAuthenticated(): BehaviorSubject<boolean> {
        return this.storeService.getIsAuthenticated();
    }

    setIsAuthenticated(authenticated: boolean): void {
        this.storeService.setIsAuthenticated(authenticated);
    }

    getLoggedInUser(): BehaviorSubject<User> {
        return this.storeService.getLoggedInUser();
    }

    setLoggedInUser(user: User): void {
        this.storeService.setLoggedInUser(user);
    }

    createUser(username: string, password: string): void {
        this.userService.createUserAccount(username, password);
    }

    getUser(user: User): User | null {
        return this.userService.findUserAccount(user);
    }

    createSession(session: Session): void {
        this.sessionService.createSession(session);
    }

    getSession(id: string): Session | null {
        return this.sessionService.getSession(id);
    }

    deleteSession(id: string): void {
        this.sessionService.deleteSession(id);
    }
}