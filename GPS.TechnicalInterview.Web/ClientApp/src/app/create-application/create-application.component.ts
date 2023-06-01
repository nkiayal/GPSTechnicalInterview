import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss'],
})
export class CreateApplicationComponent implements OnInit, OnDestroy {
  public statuses: Array<string> = ['New', 'Approved', 'Funded'];

  private destroy$ = new Subject();

  public applicationForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.pattern('[0-9]{9}]')]),
    email: new FormControl('', [Validators.email]),
    applicationNumber: new FormControl('', [Validators.required]),
    status: new FormControl('New'),
    amount: new FormControl(0, [Validators.required]),
    monthlyPayAmount: new FormControl({ value: 0, disabled: true }),
    terms: new FormControl(0, [Validators.required]),
  });

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.applicationForm
      .get('amount')
      .valueChanges.pipe(debounceTime(1000), takeUntil(this.destroy$))
      .subscribe(amount => {
        console.log('amount changed: ', amount);
        const terms = this.applicationForm.get('terms').value;
        this.applicationForm.get('monthlyPayAmount').setValue(parseFloat(amount) / parseFloat(terms));
      });

    this.applicationForm
      .get('terms')
      .valueChanges.pipe(debounceTime(1000), takeUntil(this.destroy$))
      .subscribe(terms => {
        console.log('terms changed: ', terms);
        const amount = this.applicationForm.get('amount').value;
        this.applicationForm.get('monthlyPayAmount').setValue(parseFloat(amount) / parseFloat(terms));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    console.log('submitted');
    console.log(this.applicationForm);
    console.log(this.applicationForm.value);

    const { applicationNumber, amount, email, firstName, lastName, monthlyPayAmount, phoneNumber, status, terms } = this.applicationForm.value;

    const application = {
      applicationNumber: applicationNumber,
      loanTerms: {
        amount: amount,
        monthlyPaymentAmount: monthlyPayAmount,
        term: terms,
      },
      personalInformation: {
        name: {
          first: firstName,
          last: lastName,
        },
        phoneNumber: phoneNumber,
        email: email,
      },
      dateApplied: new Date(Date.now()).toISOString(),
      status: this.statuses.indexOf(status),
    };

    console.log(application);

    this.api.createApplication(application).subscribe(response => {
      console.log(response);
    });
  }
}
