import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '../_services';
import { User } from '../_models';
import { CompanyService } from '../_services/setup/companyservice.service';
import { Company } from '../_models/setup/company';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    user: User;
    companyall: Company[]

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private CompanyService: CompanyService,
    ) { }
    errorMsg=false;

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            companyId: ['6'],
            password: ['', Validators.required]
        });
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.getcompany();
         this.errorMsg = false;
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
 
        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        this.accountService.login(this.f.username.value, this.f.password.value,"password",this.f.companyId.value)
        .pipe(first())
        .subscribe(
            data => {
                 debugger
                this.Getuser();
               
                //location.reload();
            },
            error => {
                this.alertService.error("Error Username or Password");
                this.loading = false;
                this.errorMsg = true;
            });
          
        }
     Getuser() {
        this.accountService.getcurrentuser().subscribe(result => {
             
            console.log(result);
            this.user = result as User;
            localStorage.setItem("UserDetail", JSON.stringify(this.user));
            this.router.navigate([this.returnUrl]);
          }, error => {
            console.error(error)
            window.scroll(0, 0);
          });
    }
    getcompany(){
       
        this.CompanyService.getAll().subscribe(result => {
           
            console.log(result);
            this.companyall = result as Company[];
        }, error => {
          console.error(error)
          this.alertService.error(error);
          window.scroll(0, 0);
        });;
        }
}