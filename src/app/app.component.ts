import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import CookieUtil from "./util/cookie-util";
import {User} from "./model/user";
import {AuthFacadeService} from "./service/auth.facade";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'Flight Tracker';
    isAuthenticated$: BehaviorSubject<boolean>;

    constructor(
        private router: Router,
        private authFacadeService: AuthFacadeService) {

        this.isAuthenticated$ = authFacadeService.getIsAuthenticated();
        this.isAuthenticated$.subscribe();
    }

    logout(): void {
        const id = CookieUtil.getIdFromCookie();

        if (id !== '') {
            // wipe the cookie and the kill the session
            CookieUtil.wipeCookie();
            this.authFacadeService.deleteSession(id);
        }

        this.authFacadeService.setIsAuthenticated(false);
        sessionStorage.setItem('username', '');
        this.authFacadeService.setLoggedInUser({} as User);

        this.router.navigate(['/login'])
            .then(() => {
                location.reload();
            });
    }
}
