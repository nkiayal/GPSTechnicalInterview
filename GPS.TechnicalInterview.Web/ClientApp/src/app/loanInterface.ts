export interface LoanI {
    ApplicationNumber: string,
    LoanTerms: {
        Amount: number,
        MonthlyPaymentAmount: number,
        Term: number
    }
    PersonInformation: {
        Name: {
            First: string,
            Last: string
        }
        PhoneNumber: string,
        Email: string
    }
    DateApplied: Date
    Status: any
}
