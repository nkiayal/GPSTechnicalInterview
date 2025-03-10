import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss']
})

export class CreateApplicationComponent {

  public applicationForm: FormGroup;
  public statuses: Array<string> = ['New', 'Approved', 'Funded'];
  

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router, private apiService: ApiService) {
    this.applicationForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phoneNumber: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: [null , [Validators.required, Validators.email]],
      applicationNumber: [null, Validators.required],
      status: ['New'],
      amount: [null, [Validators.required, Validators.min(1)]],
      monthlyPayAmount: [{ value: null, disabled: true }],
      terms: [null, [Validators.required, Validators.min(1)]],
    });

    this.applicationForm.get('amount')?.valueChanges.subscribe(() => this.updateMonthlyPayment());
    this.applicationForm.get('terms')?.valueChanges.subscribe(() => this.updateMonthlyPayment());
  }

  updateMonthlyPayment(): void {
    const amount = this.applicationForm.get('amount')?.value;
    const terms = this.applicationForm.get('terms')?.value;

    if (amount && terms && terms > 0) {
      const monthlyPayment = amount / terms;
      this.applicationForm.get('monthlyPayAmount')?.setValue(monthlyPayment.toFixed(2)); // Keep two decimal places
    } else {
      this.applicationForm.get('monthlyPayAmount')?.setValue(null); // Reset if inputs are invalid
    }
  }

  onSubmit() {
    if (this.applicationForm.invalid) {
      this.applicationForm.markAllAsTouched();
      return;
    }
  
    const newApplication = this.applicationForm.getRawValue(); // Get form values
    newApplication.dateApplied = new Date().toISOString(); //
  

    this.apiService.saveApplication(newApplication).subscribe(() => {
      this.snackBar.open('Created successfully.', 'Close', { duration: 3000 });

       // Redirect to dashboard 
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
        }, 2000);
    });
  }
}
