import { Action, ActionReducerMap, AppMetaReducer } from '@ngrx/store';
import { ApplicationsListEffects } from './effects/application.effects';
import { InitReducer } from './reducers/init.reducer';
import { ApplicationsReducer, IApplicationsReducer } from './reducers/application.reducers';

export interface AppState {
	[key: string]: any
	initialized: boolean
	applications: IApplicationsReducer
}

export const appReducers: ActionReducerMap<AppState, Action> = {
	initialized: InitReducer,
	applications: ApplicationsReducer
}

export const initialState: AppState = {
	initialized: false,
	applications: null
}

export const metaReducers: AppMetaReducer<AppState>[] = []

export const APP_EFFECTS = [ApplicationsListEffects]
