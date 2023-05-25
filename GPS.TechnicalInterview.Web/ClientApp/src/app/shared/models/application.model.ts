export interface ILoanApplication {
    applicationNumber?: string;
    loanTerms: ILoanTerms;
    personalInformation: IUserProfile;
    dateApplied: string;
    status: EStatus;
}

export interface ILoanTerms {
    amount: number;
    monthlyPaymentAmount: number;
    term: number
}

export interface IUserProfile {
    name: IPerson;
    phoneNumber: string;
    email: string;
}

export interface IPerson {
    first: string;
    last: string;
}

export enum EStatus {
    New,
    Approved,
    Funded
}