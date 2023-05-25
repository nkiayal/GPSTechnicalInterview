import { createSelector } from '@ngrx/store'
import { AppState } from '..';

export const selectApplicationFeature = (state: AppState) => state.applications;

export const applicationsList = createSelector(selectApplicationFeature, state => state.list)

export const applicationRecord = id =>
    createSelector(applicationsList, list => list.find(record => record.applicationNumber === id))
