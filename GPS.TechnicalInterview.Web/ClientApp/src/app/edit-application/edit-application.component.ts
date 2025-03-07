import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-edit-application',
  templateUrl: './edit-application.component.html',
  styleUrls: ['./edit-application.component.scss']
})
export class EditApplicationComponent implements OnInit {
  public applicationForm: FormGroup;
  public applicationNumber!: string;
  public statuses: Array<string> = ['New', 'Approved', 'Funded'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private apiService: ApiService
  ) {
    this.applicationForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phoneNumber: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: [null, [Validators.required, Validators.email]],
      applicationNumber: [{ value: null, disabled: true }], // Disabled since it can't be changed
      status: ['New'],
      amount: [null, [Validators.required, Validators.min(1)]],
      monthlyPayAmount: [{ value: null, disabled: true }],
      terms: [null, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.applicationNumber = this.route.snapshot.paramMap.get('applicationNumber')!;
    this.loadApplicationData();
    
    // Auto-update monthly payment
    this.applicationForm.get('amount')?.valueChanges.subscribe(() => this.updateMonthlyPayment());
    this.applicationForm.get('terms')?.valueChanges.subscribe(() => this.updateMonthlyPayment());
  }

  loadApplicationData(): void {
    this.apiService.getApplications().subscribe((applications) => {
      const application = applications.find(app => app.applicationNumber === this.applicationNumber);
      if (application) {
        this.applicationForm.patchValue(application);
      } else {
        this.snackBar.open('Application not found!', 'Close', { duration: 3000 });
        this.router.navigate(['/dashboard']);
      }
    });
  }

  updateMonthlyPayment(): void {
    const amount = this.applicationForm.get('amount')?.value;
    const terms = this.applicationForm.get('terms')?.value;

    if (amount && terms && terms > 0) {
      const monthlyPayment = amount / terms;
      this.applicationForm.get('monthlyPayAmount')?.setValue(monthlyPayment.toFixed(2));
    } else {
      this.applicationForm.get('monthlyPayAmount')?.setValue(null);
    }
  }

  onSubmit(): void {
    if (this.applicationForm.invalid) {
      this.applicationForm.markAllAsTouched();
      return;
    }
  
    const updatedApplication = this.applicationForm.getRawValue();
    updatedApplication.applicationNumber = this.applicationNumber; // Ensure correct applicationNumber
  
    this.apiService.updateApplication(this.applicationNumber, updatedApplication).subscribe({
      next: () => {
        this.snackBar.open('Saved Successfully', 'Close', { duration: 3000 });
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error: (err) => console.error('Error updating application:', err)
    });
  }
  
}
