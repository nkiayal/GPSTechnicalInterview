
export enum FormModes {
	create = 'create',
	edit = 'edit',
}
export type FormMode = keyof typeof FormModes

export interface IFormShape {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    applicationNumber: string,
    status: string,
    amount: string,
    monthlyPayAmount: string,
    term: string,
}