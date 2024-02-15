import {inject} from "@angular/core";
import {Router} from "@angular/router";
import CookieUtil from "./util/cookie-util";
import {AuthFacadeService} from "./service/auth.facade";

export const authorizationGuard = () => {
    const authFacadeService = inject(AuthFacadeService);

    const router = inject(Router);
    const id = CookieUtil.getIdFromCookie();

    // Check our session to see if we still have a valid session. Then set our BehaviorSubject accordingly.
    const s = authFacadeService.getSession(id);
    authFacadeService.setIsAuthenticated(s !== null);

    if (s) {
        return true;
    }

    // If we have not successfully logged in, then redirect to the unauthorized page.
    return router.navigate(['/unauthorized']);
};