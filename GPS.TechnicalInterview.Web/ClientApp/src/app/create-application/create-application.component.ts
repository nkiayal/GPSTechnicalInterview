import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss']
})

export class CreateApplicationComponent {

  public applicationForm: FormGroup;
  public statuses: Array<string> = ['New', 'Approved', 'Funded'];
  private applicationsStorage = '/GPS.TechnicalInterview.Web/ClientApp/src/app/DB.json';

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router, private http: HttpClient) {
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
  
    const newApplication = this.applicationForm.getRawValue(); // Get form values including disabled fields
  
    // Save application in localStorage (Since Angular can't write to JSON files directly)
    let applications = JSON.parse(localStorage.getItem('applications') || '[]');
    applications.push(newApplication);
    localStorage.setItem('applications', JSON.stringify(applications));
  
    // Show success message
    this.snackBar.open('Created successfully.', 'Close', { duration: 3000 });
  
    // Redirect to dashboard after 2 seconds
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 2000);
  }
  
}
