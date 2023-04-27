import { LoanTerms } from "./loanTerms";
import { PersonalInformation } from "./personalInformation";
import { Status } from "./status";

export interface LoanApplication {
    applicationNumber: string;
    loanTerms: LoanTerms;
    personalInformation: PersonalInformation;
    dateApplied: Date;
    status: Status
}