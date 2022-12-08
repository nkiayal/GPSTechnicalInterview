// Would break out this interface into smaller pieces if parts used separately. For sake of this kept as 1 large interface
export interface ILoanApplication {
  ApplicationNumber: string,
  LoanTerms: {
    Amount: number,
    MonthlyPaymentAmount: number,
    Term: number
  },
  PersonalInformation: {
    Name: {
      First: string,
      Last: string
    },
    PhoneNumber: string,
    Email: string
  },
  DateApplied: string,
  Status: StatusEnum
}

export enum StatusEnum {
  new = 'New',
  approved = 'Approved',
  funded = 'Funded'
}