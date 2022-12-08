import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { LoanI } from '../loanInterface';
@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
    styleUrls: ['./create-application.component.scss']
})
export class CreateApplicationComponent implements OnInit {

  public applicationForm: FormGroup;
    public statuses: Array<string> = ['New', 'Approved', 'Funded'];
    private url = "https://localhost:5001"
    public editData = {
        personalInformation: {
        name: {
        first: 2,
        last: 2,
        },
        phoneNumber: 2,
        email: 2
        },
        applicationNumber: 2,
        status: ['New'],
        loanTerms: {
        amount: 2,
        monthlyPaymentAmount: 2,
        terms: 2,
        }
    };
    constructor(private formBuilder: FormBuilder, private apiService: ApiService, private route: ActivatedRoute, private _snackBar: MatSnackBar) {
        this.applicationForm = this.formBuilder.group({
          firstName: new FormControl(null,[Validators.required]),
          lastName: new FormControl(null, [Validators.required]),
          phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(9), Validators.maxLength(10)]),
          email: new FormControl(null, [Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)]),
          applicationNumber: new FormControl(null, [Validators.required]),
          status: ['New'],
            amount: new FormControl(0, [Validators.required, Validators.min(1)]),
            monthlyPayAmount: new FormControl(0, [Validators.required]),
          terms: new FormControl(0, [Validators.required, Validators.min(1)]),
        });
    }
    openSnackBar(message: string) {
        this._snackBar.open(message, "OK");
    }
    public monthlyPayAmnt;
    monthlyPayAmntChan() {
        let amnt = this.applicationForm.get("amount").value;
        let terms = this.applicationForm.get("terms").value;
        console.log("changed..",amnt,terms)
        if (amnt > 0 && terms > 0) {
            this.monthlyPayAmnt = amnt / terms;
        } else {
            this.monthlyPayAmnt = 0;
        }
    }
    public id;
    public isReadOnly;
    ngOnInit() {
        this.route.params.subscribe((params => {
            this.id = params.id;
            console.log("params: ", params)
        }))
        if (this.id !== undefined) {
            console.log("id is: ", this.id)
            let theUrl = this.url + "/applicationManager/" + this.id;
            this.isReadOnly = true;
            this.apiService.sendGetRequest(theUrl).subscribe(data => {
                this.editData = data;
                console.log("this.editData: ", this.editData);
                this.applicationForm.setValue({
                    firstName: this.editData.personalInformation.name.first,
                    lastName: this.editData.personalInformation.name.last,
                    phoneNumber: this.editData.personalInformation.phoneNumber,
                    email: this.editData.personalInformation.email,
                    applicationNumber: this.editData.applicationNumber,
                    status: this.editData.status,
                    amount: this.editData.loanTerms.amount,
                    monthlyPayAmount: this.editData.loanTerms.monthlyPaymentAmount,
                    terms: this.editData.loanTerms.terms,
                });
            })
            this.onSubmit = this.onEditSubmit
        } else {
            console.log("id is undefined")
            this.isReadOnly = false
            this.onSubmit = this.onRegisterSubmit
        }
        
    }
    public onSubmit;
    public formValue;
    private toSend() {
        this.formValue = this.applicationForm.value;
       let toSend = {
            ApplicationNumber: this.formValue.applicationNumber,
            LoanTerms: {
                Amount: this.formValue.amount,
                MonthlyPayAmount: this.formValue.monthlyPayAmount,
                terms: this.formValue.terms
            },
            PersonalInformation: {
                Name: {
                    first: this.formValue.firstName,
                    last: this.formValue.lastName
                },
                phoneNumber: this.formValue.phoneNumber,
                email: this.formValue.email
            },
           Status: this.formValue.status
        }
        return toSend
    }
    onEditSubmit(): void {
        let theUrl = this.url + "/applicationManager/" + this.id
        this.apiService.sendPutRequest(theUrl, this.toSend()).subscribe(data => { this.openSnackBar("Saved successfully") });
    }

    onRegisterSubmit(): void {
        let theUrl = this.url + "/applicationManager/saveApp";
        let theDate = new Date()
        let regSend = {
            ...this.toSend(),
            DateApplied: theDate.getFullYear() + "/" + theDate.getMonth() + "/"+theDate.getDate()
            }
        this.apiService.sendPostRequest(theUrl, regSend)
            .subscribe(data => { this.openSnackBar("Created successfully") });
    };
        //var apiServ = ApiService
    
}
