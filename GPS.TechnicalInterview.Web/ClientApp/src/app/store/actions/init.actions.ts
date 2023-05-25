import { Action } from '@ngrx/store'

export const INITIALIZE_APP = '[Trapeze] Initialize App'
export const APP_INITIALIZED = '[Trapeze] App Initialized'

export class InitializeApp implements Action {
	public readonly type = INITIALIZE_APP
}

export class AppInitialized implements Action {
	public readonly type = APP_INITIALIZED
}

export type AppInitAction = InitializeApp | AppInitialized