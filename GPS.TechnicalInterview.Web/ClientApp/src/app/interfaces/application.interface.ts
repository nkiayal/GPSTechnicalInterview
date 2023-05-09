import { Status } from './status.interface';

export interface IApplication {
    applicationNumber: string;
    loanTerms: {
        amount: number;
        monthlyPaymentAmount: number;
        term: number
    };
    personalInformation: {
        name: {
            first: string;
            last: string;
        }
        phoneNumber: string;
        email: string;
    };
    dateApplied: string;
    status: Status;
} 