import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {FlightHttpService} from "../service/flight-http.service";
import {catchError, EMPTY, exhaustMap, map, of, tap} from "rxjs";
import {StoreService} from "../service/store.service";
import {loadFlights, loadFlightsSuccess} from "../flights.actions";

@Injectable()
export class FlightsEffects {

  loadFlights$ = createEffect(() => this.actions$.pipe(
      ofType(loadFlights),
      exhaustMap(() => this.flightHttpService.getFlights()
        .pipe(
          map(flights => (loadFlightsSuccess({flights}))),
          catchError(() => EMPTY)
        ))
    )
  );

  loadFlightsSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(loadFlightsSuccess),
      exhaustMap(data => of(data)
        .pipe(
          tap(data => {
            // it's also possible to have a reducer listen for success, set it in the store, and having a selector read it out
            this.storeService.setFlightList(data.flights);
          })
        )
      )
    // https://this-is-angular.github.io/ngrx-essentials-course/docs/chapter-11/#not-all-effects-should-dispatch
    ), {dispatch: false}
  );


    constructor(private actions$: Actions,
                private flightHttpService: FlightHttpService,
                private storeService: StoreService) {
    }

}
