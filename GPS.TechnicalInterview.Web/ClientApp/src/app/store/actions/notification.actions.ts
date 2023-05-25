import { Action } from "@ngrx/store"

export const CREATE_NOTIFICATION = '[Notifications] Create Notification'

export class CreateNotification implements Action {
	public readonly type = CREATE_NOTIFICATION

	constructor(
		public readonly settings: any[]
	) { }
}