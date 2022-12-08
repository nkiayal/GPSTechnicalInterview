import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { ILoanApplication } from '../shared/loan-interfaces';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss']
})
export class CreateApplicationComponent implements OnInit {

  public applicationForm: FormGroup;
  public statuses: Array<string> = ['New', 'Approved', 'Funded']; // I would replace this with a enum
  public formReady = false;

  private applicationNumber: string;

  constructor(
    private formBuilder: FormBuilder, 
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
    ) {}

  public ngOnInit(): void {
    this.applicationNumber = this.activatedRoute.snapshot.paramMap.get('applicationNumber')
    this.getLoanApplication()
  }

  public createOrSave(): void {
    // Validate form to make sure there are no errors

    const formValue = this.applicationForm.value
    const newLoanApplication: ILoanApplication = {
      ApplicationNumber: formValue.applicationNumber,
      LoanTerms: {
        Amount: formValue.amount,
        MonthlyPaymentAmount: formValue.monthlyPayAmount,
        Term: formValue.terms
      },
      PersonalInformation: {
        Name: {
          First: formValue.firstName,
          Last: formValue.lastName
        },
        PhoneNumber: formValue.phoneNumber,
        Email: formValue.email
      },
      DateApplied: formValue.dateApplied,
      Status: formValue.status
    }

    if(this.applicationNumber) {
      // Crud call to update existing loanApplication
      // Open snackbar that says "Saved successfully"
    } else {
      // Crud call to create the new loanApplication and add it to the database
      // Open snackbar that says "Created successfully"
    }
  }

  private getLoanApplication(): void {
    // Larger codebase I would move http logic into its own service
    this.http.get('assets/mock-database.json').pipe(take(1)).subscribe((loanApplications: ILoanApplication[]) => {
      const foundApplication = loanApplications.find(application => application.ApplicationNumber === this.applicationNumber)
      if(foundApplication) this.buildFormWithData(foundApplication)
      else this.buildEmptyForm()
    })
  }

  private buildEmptyForm(): void {
    this.applicationForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phoneNumber: [null, Validators.pattern('[- +()0-9]+')],
      email: [null, Validators.email],
      applicationNumber: [null],
      status: ['New'],
      amount: [null],
      monthlyPayAmount: [null],
      terms: [null],
    });
    this.formReady = true
  }

  private buildFormWithData(loanApplication: ILoanApplication): void {
    this.applicationForm = this.formBuilder.group({
      firstName: [loanApplication.PersonalInformation.Name.First, Validators.required],
      lastName: [loanApplication.PersonalInformation.Name.Last, Validators.required],
      phoneNumber: [loanApplication.PersonalInformation.PhoneNumber, Validators.pattern('[- +()0-9]+')],
      email: [loanApplication.PersonalInformation.Email, Validators.email],
      applicationNumber: [loanApplication.ApplicationNumber],
      status: [loanApplication.Status],
      amount: [loanApplication.LoanTerms.Amount],
      monthlyPayAmount: [loanApplication.LoanTerms.MonthlyPaymentAmount],
      terms: [loanApplication.LoanTerms.Term],
    });
    this.formReady = true
  }
}
