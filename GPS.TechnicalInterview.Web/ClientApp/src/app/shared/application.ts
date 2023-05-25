import { EStatus, ILoanApplication, ILoanTerms, IUserProfile } from "./models/application.model"

export class LoanApplication implements ILoanApplication{
    applicationNumber?: string;
    loanTerms: ILoanTerms;
    personalInformation: IUserProfile;
    dateApplied: string;
    status: EStatus;

    constructor() {
        const date = new Date();

        this.applicationNumber = null;
        this.loanTerms = {
            amount: 0,
            monthlyPaymentAmount: 0,
            term: 0,
        };
        this.personalInformation = {
            name: {
                first: '',
                last: ''
            },
            phoneNumber: '',
            email:''
        }
        this.dateApplied = date.toISOString();
        this.status = 0;
    }
}