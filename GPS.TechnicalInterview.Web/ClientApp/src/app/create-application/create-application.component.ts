import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../api.service';
import { Application, LoanStatus } from 'src/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss']
})
export class CreateApplicationComponent {

  public applicationForm: FormGroup;
  public statuses: Array<string> = ['New', 'Approved', 'Funded'];
  public applicationNumber?: string;
  private _amountSubscription: Subscription;
  private _termsSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private snackBar: MatSnackBar,
  ) {
    this.applicationForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phoneNumber: [null, [
        Validators.maxLength(9),
        Validators.minLength(9),
        Validators.pattern("^[0-9]*$"),
      ]],
      email: [null, Validators.email],
      applicationNumber: [null, Validators.required],
      status: [this.statuses[LoanStatus.New]],
      amount: [null, [
        Validators.required,
        this.numberValidator,
      ]],
      monthlyPayAmount: ['$0.00'],
      terms: [null, [
        Validators.required,
        this.numberValidator,
      ]],
    });
  }

  private readonly numberValidator: ValidationErrors = (control: AbstractControl) => {
    const num = Number(control?.value);
    if (Number.isNaN(num) || num < 0) {
      return { invalidNumber: true, };
    }
  }

  ngOnInit() {
    this.applicationNumber = this.route.snapshot.params['applicationNumber'];
    const application = this.applicationNumber ? this.api.dataSource.find(({ applicationNumber }) => applicationNumber === this.applicationNumber) : undefined;
    if (application) {
      this.applicationForm.setValue({
        firstName: application.profile.firstName,
        lastName: application.profile.lastName,
        phoneNumber: application.profile.phoneNumber,
        email: application.profile.email,
        applicationNumber: application.applicationNumber,
        status: this.statuses[application.loan.status],
        amount: application.loan.centsAmount / 100,
        monthlyPayAmount: `$${(application.loan.centsAmount / 100 / application.loan.terms).toFixed(2)}`,
        terms: application.loan.terms,
      });
    } else if (this.applicationNumber) {
      this.router.navigate(['/']);
    }

    this._amountSubscription = this.applicationForm.controls['amount'].valueChanges.subscribe(data => {
      const amount = Number(data);
      const terms = Number(this.applicationForm.controls['terms'].value);
      const value = `$${(terms >= 1 ? amount / terms : amount).toFixed(2)}`;
      this.applicationForm.controls['monthlyPayAmount'].setValue(value);
    });
    this._termsSubscription = this.applicationForm.controls['terms'].valueChanges.subscribe(data => {
      const terms = Number(data);
      const amount = Number(this.applicationForm.controls['amount'].value);
      const value = `$${(terms >= 1 ? amount / terms : amount).toFixed(2)}`;
      this.applicationForm.controls['monthlyPayAmount'].setValue(value);
    });
  }

  ngOnDestroy() {
    this._amountSubscription.unsubscribe();
    this._termsSubscription.unsubscribe();
  }

  public onSave() {
    if (this.applicationForm.valid) {
      const application: Application = {
        applicationNumber: this.applicationForm.controls['applicationNumber'].value,
        createdAt: new Date(),
        updatedAt: new Date(),
        loan: {
          centsAmount: Math.floor(Number(this.applicationForm.controls['amount'].value) * 100),
          terms: this.applicationForm.controls['terms'].value,
          status: this.statuses.findIndex(value => value === this.applicationForm.controls['status'].value),
        },
        profile: {
          firstName: this.applicationForm.controls['firstName'].value,
          lastName: this.applicationForm.controls['lastName'].value,
          phoneNumber: this.applicationForm.controls['phoneNumber'].value,
          email: this.applicationForm.controls['email'].value,
        },
      };
      if (this.applicationNumber) {
        this.api.editApplication(application, () => {
          this.snackBar.open('Saved successfully.', 'OK', {
            duration: 2000,
          });
          this.router.navigate(['/']);
        }, () => {
          this.snackBar.open('Unable to update this application.', 'OK', {
            duration: 2000,
          });
        });
      } else {
        this.api.createApplication(application, () => {
          this.snackBar.open('Created successfully.', 'OK', {
            duration: 2000,
          });
          this.router.navigate(['/']);
        }, () => {
          this.snackBar.open('Unable to create this application.', 'OK', {
            duration: 2000,
          });
        });
      }
    } else {
      this.snackBar.open('Invalid input.', 'OK', {
        duration: 2000,
      });
    }
  }

}
