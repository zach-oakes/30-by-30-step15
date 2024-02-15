import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {v4} from "uuid";
import {Session} from "../model/session";
import CookieUtil from "../util/cookie-util";
import {AuthFacadeService} from "../service/auth.facade";

@Component({
    selector: 'app-login-screen',
    templateUrl: './login-screen.component.html',
    styleUrl: './login-screen.component.css'
})
export class LoginScreenComponent {
    hidePassword = true;
    username = '';
    password = '';
    loginFailed = false;

    constructor(private authFacadeService: AuthFacadeService,
                private router: Router) {
    }

    login(): void {
        this.loginFailed = false;

        const user = this.authFacadeService.getUser({
            username: this.username,
            password: this.password,
        });

        // If user does not exist that means they haven't created their Account yet. Fail the login.
        if (!user) {
            this.loginFailed = true;
            return;
        }

        this.authFacadeService.setLoggedInUser(user);

        // Create session and store cookie
        const id = v4();
        const session: Session = {id, username: this.username, createTimestamp: new Date().toUTCString()};
        this.authFacadeService.createSession(session);

        CookieUtil.createCookie(id);
        this.authFacadeService.setIsAuthenticated(true);
        this.router.navigate(['/dashboard']);
    }

    get isDisabled(): boolean {
        return this.username === '' ||
            this.username === undefined ||
            this.password === '' ||
            this.password === undefined;
    }
}

