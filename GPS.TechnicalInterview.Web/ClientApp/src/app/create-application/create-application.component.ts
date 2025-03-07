import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss']
})
export class CreateApplicationComponent {

  public applicationForm: FormGroup;
  public statuses: Array<string> = ['New', 'Approved', 'Funded'];
  public isSubmitting = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router) {
    this.applicationForm = this.formBuilder.group({
      firstName: [null],
      lastName: [null],
      phoneNumber: [null],
      email: [null],
      applicationNumber: [null],
      status: ['New'],
      amount: [null],
      monthlyPayAmount: [null],
      terms: [null],
    });
  }

  saveApplication(): void {
    if (this.applicationForm.invalid) {
      Object.keys(this.applicationForm.controls).forEach(key => {
        const control = this.applicationForm.get(key);
        control?.markAsTouched();
      });
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 5000,
        panelClass: 'error-snackbar'
      });
      return;
    }

    this.isSubmitting = true;
    
    const formValues = this.applicationForm.value;
      const loanApplication = {
          personalInformation: {
              name: {
                  first: formValues.firstName,
                  last: formValues.lastName
              },
              phoneNumber: formValues.phoneNumber,
              email: formValues.email
          },
          applicationNumber: formValues.applicationNumber,
          status: formValues.status,
          loanTerms: {
              amount: parseFloat(formValues.amount),
              monthlyPayAmount: parseFloat(formValues.monthlyPayAmount) || 0,
              terms: formValues.terms
          },
          dateApplied: new Date().toISOString()
      };

  console.log('Sending application data:', loanApplication);

  this.http.post('/ApplicationManager/CreateApplication', loanApplication)
    .subscribe({
      next: (response: any) => {
        console.log('Response received:', response);
        // Check if response is an object and has a message property
        const message = response && typeof response === 'object' && response.message 
          ? response.message 
          : 'Application created successfully!';
          
        this.snackBar.open(message, 'Close', {
          duration: 5000
        });
        this.isSubmitting = false;
        this.router.navigate(['/applications']); // Navigate to applications list
      },
      error: (error) => {
        console.error('Error creating application:', error);
        const errorMessage = error.error && typeof error.error === 'string' 
          ? error.error 
          : 'Failed to create application. Please try again.';
          
        this.snackBar.open(errorMessage, 'Close', { 
          duration: 5000, 
          panelClass: 'error-snackbar' 
        });
        this.isSubmitting = false;
      }
    });
  }
}
