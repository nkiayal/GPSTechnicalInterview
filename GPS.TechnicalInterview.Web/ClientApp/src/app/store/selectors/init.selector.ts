import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AppState } from ".."

export const appInitialized = createFeatureSelector<AppState>('initialized')

export const notAlreadyInitialized = createSelector(
	appInitialized,
	initialized => !initialized
)