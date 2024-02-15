import {createAction, props} from "@ngrx/store";
import {Flight} from "./model/flight";

export const loadFlights = createAction('[Flights Page] Load Flights');
export const loadFlightsSuccess = createAction(
    '[Flights API] Flights Loaded Success',
    props<{flights: Flight[]}>(),
);
