import { Action } from '@ngrx/store';
import { ILoanApplication } from '../../shared/models/application.model';

export const LOAD_ALL_APPLICATIONS = '[Applications] Load All Applications'
export const ALL_APPLICATIONS_LOADED = '[Applications] All Applications Loaded'

export const LOAD_APPLICATION = '[Applications] Load Application'
export const APPLICATION_LOADED = '[Applications] Application Loaded'

export const CREATE_APPLICATION = '[Applications] Create Application'
export const APPLICATION_CREATED = '[Applications] Application Created'

export const UPDATE_APPLICATION = '[Applications] Update Application'
export const APPLICATION_UPDATED = '[Applications] Application Updated'

export const DELETE_APPLICATION = '[Applications] Delete Application'
export const APPLICATION_DELETED = '[Applications] Application Deleted'

export class LoadAllApplications implements Action {
	public readonly type = LOAD_ALL_APPLICATIONS
}

export class AllApplicationsLoaded implements Action {
	public readonly type = ALL_APPLICATIONS_LOADED
	constructor(
		public readonly applications: { list: ILoanApplication[] }
	) { }
}

export class LoadApplication implements Action {
	public readonly type = LOAD_APPLICATION
	constructor(
		public readonly id: string
	) { }
}

export class ApplicationLoaded implements Action {
	public readonly type = APPLICATION_LOADED
	constructor(
		public readonly applicationRecord: ILoanApplication
	) { }
}
export class CreateApplication implements Action {
	public readonly type = CREATE_APPLICATION
	constructor(
		public readonly applicationRecord: ILoanApplication
	) { }
}

export class ApplicationCreated implements Action {
	public readonly type = APPLICATION_CREATED
}

export class UpdateApplication implements Action {
	public readonly type = UPDATE_APPLICATION
	constructor(
		public readonly applicationRecord: ILoanApplication
	) { } }

export class ApplicationUpdated implements Action {
	public readonly type = APPLICATION_UPDATED
}

export type ApplicationsListAction =
	| LoadAllApplications
	| AllApplicationsLoaded
	| LoadApplication
	| ApplicationLoaded
	| CreateApplication
	| ApplicationCreated
	| UpdateApplication
	| ApplicationUpdated