import { Injectable } from "@angular/core";
import { LoanApplication } from "../application";
import { EStatus } from "../models/application.model";
import { IFormShape } from '../models/form.model';


@Injectable()
export class ApplicationFormService {

    // TODO: This is horrible and I'm ashamed
    // Form Controls should be tweaked to match the shape, should use FormGroup for nested layers
    public dataToForm(obj: LoanApplication) {
        let squashed = this.flattenData(obj);
        let formattedData: IFormShape = {} as IFormShape;
        for (const [key, value] of Object.entries(squashed)) {
            switch (key) {
                case 'personalInformation.name.first':
                    formattedData.firstName = value.toString();
                    break;
                case 'personalInformation.name.last':
                    formattedData.lastName = value.toString();
                    break;
                case 'applicationNumber':
                    formattedData.applicationNumber = value.toString();
                    break;
                case 'personalInformation.phoneNumber':
                    formattedData.phoneNumber = value.toString();
                    break;
                case 'personalInformation.email':
                    formattedData.email = value.toString();
                    break;
                case 'status':
                    formattedData.status = EStatus[value as number];
                    break;
                case 'loanTerms.amount':
                    formattedData.amount = value.toString();
                    break;
                case 'loanTerms.monthlyPaymentAmount':
                    formattedData.monthlyPayAmount = value.toString();
                    break;
                case 'loanTerms.term':
                    formattedData.term = value.toString();
                    break;
            }
        }

        return formattedData;
    }

    public mapFormToData(form): LoanApplication {
        let applicationData: LoanApplication = new LoanApplication;
        for (const [key, value] of Object.entries(form)) {
            switch (key) {
                case 'firstName':
                    applicationData.personalInformation.name.first = value.toString();
                    break;
                case 'lastName':
                    applicationData.personalInformation.name.last = value.toString();
                    break;
                case 'applicationNumber':
                    applicationData.applicationNumber = value.toString();
                    break;
                case 'phoneNumber':
                    applicationData.personalInformation.phoneNumber = value.toString();
                    break;
                case 'email':
                    applicationData.personalInformation.email = value.toString();
                    break;
                case 'status':
                    applicationData.status = EStatus[value.toString()];
                    break;
                case 'amount':
                    applicationData.loanTerms.amount = value as number;
                    break;
                case 'monthlyPaymentAmount':
                    applicationData.loanTerms.monthlyPaymentAmount = value as number;
                    break;
                case 'term':
                    applicationData.loanTerms.term = value as number;
                    break;
            }
        }
        return applicationData;
    }

    public flattenData(obj) {
        const result = {};
        for (const key of Object.keys(obj)) {
            if (typeof obj[key] === 'object') {
                const nested = this.flattenData(obj[key]);
                for (const nestedKey of Object.keys(nested)) {
                    result[`${key}.${nestedKey}`] = nested[nestedKey];
                }
            } else {
                result[key] = obj[key];
            }
        }
        return result;
    }

}