import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Flight} from "../model/flight";
import {SessionService} from "./session.service";
import CookieUtil from "../util/cookie-util";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private flightList$: BehaviorSubject<Flight[]> = new BehaviorSubject<Flight[]>([]);
  private selectedFlight$: BehaviorSubject<Flight> = new BehaviorSubject<Flight>({} as Flight);
  private isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loggedInUser$: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);

  constructor(private sessionService: SessionService) {
    // set initial value for is authenticated by checking to see if we have a session
    const id = CookieUtil.getIdFromCookie();

    if (id !== '') {
      const session = this.sessionService.getSession(id);

      this.isAuthenticated$.next(session !== null);
    }
  }

  getFlightList(): BehaviorSubject<Flight[]> {
    return this.flightList$;
  }

  setFlightList(flightList: Flight[]): void {
    this.flightList$.next(flightList);
  }

  getSelectedFlight(): BehaviorSubject<Flight> {
    return this.selectedFlight$;
  }

  setSelectedFlight(flight: Flight): void {
    this.selectedFlight$.next(flight);
  }

  setIsAuthenticated(authenticated: boolean): void {
    this.isAuthenticated$.next(authenticated);
  }

  getIsAuthenticated(): BehaviorSubject<boolean> {
    return this.isAuthenticated$;
  }

  getLoggedInUser(): BehaviorSubject<User> {
    return this.loggedInUser$;
  }

  setLoggedInUser(user: User): void {
    this.loggedInUser$.next(user);
  }
}
