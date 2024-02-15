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
                    map(flights => ({type: '[Flights API] Flights Loaded Success', payload: flights})),
                    catchError(() => EMPTY)
                ))
        )
    );

    loadFlightsSuccess$ = createEffect(() => this.actions$.pipe(
            ofType(loadFlightsSuccess),
            exhaustMap(data => of(data)
                .pipe(
                    tap(data => {

                        // this results in an infinite loop
                        this.storeService.setFlightList(data.flights);
                    })
                )
            )
        )
    );


    constructor(private actions$: Actions,
                private flightHttpService: FlightHttpService,
                private storeService: StoreService) {
    }

}