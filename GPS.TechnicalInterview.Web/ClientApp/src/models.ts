
export enum LoanStatus {
    New,
    Approved,
    Funded,
}

export interface Loan {
    centsAmount: number
    terms: number
    status: LoanStatus
}

export interface Profile {
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
}

export interface Application {
    applicationNumber: string
    createdAt: Date
    updatedAt: Date
    loan: Loan
    profile: Profile
}
