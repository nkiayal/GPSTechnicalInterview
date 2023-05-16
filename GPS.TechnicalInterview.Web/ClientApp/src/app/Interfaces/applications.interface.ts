export interface Application {
  applicationNumber: string;
  loanTerms: LoanTerms;
  personalInformation: PersonalInformation;
  dateApplied: Date;
  status: Status;
}

export interface LoanTerms {
  amount: number;
  monthlyPaymentAmount: number;
  term: number;
}

export interface PersonalInformation {
  name: Name;
  phoneNumber: string;
  email: string;
}

export interface Name {
  first: string;
  last: string;
}

export enum Status {
  NEW = 0,
  APPROVED = 1,
  FUNDED = 2,
}
