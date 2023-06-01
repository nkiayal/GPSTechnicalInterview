import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss'],
})
export class CreateApplicationComponent implements OnInit, OnDestroy {
  public statuses: Array<string> = ['New', 'Approved', 'Funded'];

  private editing = '';
  private destroy$ = new Subject();

  public applicationForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.pattern(/^([0-9]{9})$/)]),
    email: new FormControl('', [Validators.email]),
    applicationNumber: new FormControl('', [Validators.required]),
    status: new FormControl('New'),
    amount: new FormControl('', [Validators.required]),
    monthlyPayAmount: new FormControl({ value: '', disabled: true }),
    terms: new FormControl('', [Validators.required]),
  });

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params.edit) {
        this.api.getApplication(params.edit).subscribe(application => {
          console.log(application);

          if (application) {
            this.editing = params.edit;
            this.applicationForm.get('applicationNumber').disable();

            this.applicationForm.setValue({
              firstName: application.personalInformation.name.first,
              lastName: application.personalInformation.name.last,
              phoneNumber: application.personalInformation.phoneNumber,
              email: application.personalInformation.email,
              applicationNumber: application.applicationNumber,
              status: this.statuses[application.status],
              amount: application.loanTerms.amount,
              monthlyPayAmount: application.loanTerms.monthlyPaymentAmount,
              terms: application.loanTerms.term,
            });
          }
        });
      }
    });

    this.applicationForm
      .get('amount')
      .valueChanges.pipe(debounceTime(1000), takeUntil(this.destroy$))
      .subscribe(amount => {
        console.log('amount changed: ', amount);
        const terms = this.applicationForm.get('terms').value;
        if (amount && terms) {
          this.applicationForm.get('monthlyPayAmount').setValue(parseFloat(amount) / parseFloat(terms));
        }
      });

    this.applicationForm
      .get('terms')
      .valueChanges.pipe(debounceTime(1000), takeUntil(this.destroy$))
      .subscribe(terms => {
        console.log('terms changed: ', terms);
        const amount = this.applicationForm.get('amount').value;
        if (amount && terms) {
          this.applicationForm.get('monthlyPayAmount').setValue(parseFloat(amount) / parseFloat(terms));
        }
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

    if (this.editing) {
      this.api.updateApplication(this.editing, application).subscribe(response => {
        console.log(response);
      });
      return;
    }

    this.api.createApplication(application).subscribe(response => {
      console.log(response);
    });
  }
}
