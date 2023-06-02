export const STATUSES: Array<string> = ['New', 'Approved', 'Funded'];

export interface Application {
  applicationNumber: string;
  dateApplied: string;
  status: number;
  loanTerms: LoanTerms;
  personalInformation: PersonalInformation;
}

type LoanTerms = {
  amount: number;
  monthlyPaymentAmount: number;
  term: number;
};

type Name = {
  first: string;
  last: string;
};

type PersonalInformation = {
  name: Name;
  phoneNumber: string;
  email: string;
};
