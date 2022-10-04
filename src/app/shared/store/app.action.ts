import { createAction, props } from "@ngrx/store";
import { Appstate } from "./appstate";

export const setAPIStatus = createAction(
    '[API] sucesss or fail',
    props<{apiStatus: Appstate}>()
)