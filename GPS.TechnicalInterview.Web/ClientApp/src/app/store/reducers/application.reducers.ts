import { ILoanApplication } from '../../shared/models/application.model';
import * as fromLoanActions from '../actions/application.actions';

export interface IApplicationsReducer {
	list: ILoanApplication[]
}

export function ApplicationsReducer(
	state: IApplicationsReducer = { list: [] },
	action: fromLoanActions.ApplicationsListAction
) {
	const newState = { ...state }
	switch (action.type) {
		case fromLoanActions.LOAD_ALL_APPLICATIONS:
		case fromLoanActions.LOAD_APPLICATION: {
			return newState
		}

		case fromLoanActions.ALL_APPLICATIONS_LOADED: {
			newState.list = [...action.applications.list]
			return newState
		}
		case fromLoanActions.APPLICATION_LOADED: {
			newState.list = [action.applicationRecord]
			return newState
		}
		default: {
			return state
		}
	}

	
}