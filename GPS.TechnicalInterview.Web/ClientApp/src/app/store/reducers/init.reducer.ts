import * as fromInitActions from '../actions/init.actions'

export function InitReducer(
	initialized: boolean = false,
	action: fromInitActions.AppInitAction
) {
	switch (action.type) {
		case fromInitActions.APP_INITIALIZED: {
			return true
		}

	}

	return initialized
}
