import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../_services/setup/customerService.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Customer } from '../../_models/setup/customer';
import { AlertService } from '../../_services';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  constructor(  private customerService: CustomerService, private alertService: AlertService,
    private formBuilder: FormBuilder) { }
    registerForm: FormGroup;
  submitted = false;
  customerall  : Customer[];
  Customer : Customer;
  listshow=true;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  ngOnInit() {
    this.listshow = true;
    this.getCustomer();
    this.registerForm = this.formBuilder.group({
      customerName: ['', Validators.required],
      customerNameBangla: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      webAddress: [''],
      fax: [''],
  });
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    processing: true
  };
  }
   // convenience getter for easy access to form fields
   get f() { return this.registerForm.controls; }
   onSubmit() {
      
       this.submitted = true;
       // stop here if form is invalid
       if (this.registerForm.invalid) {
           return;
       }
       if(!this.Customer){
        this.customerService.Create(this.registerForm.value).subscribe(result => {
           ;
          this.alertService.success('Success Insert');
          this.getCustomer();
          this.onReset();
          this.listshow = true;
            window.scroll(0, 0);
        }, error => {
           
          this.alertService.error(error);
          window.scroll(0, 0);
        });
       }else{
        this.customerService.udate(this.registerForm.value).subscribe(result => {
           
          this.alertService.success('Success Update');
          this.getCustomer();
          this.onReset();
            window.scroll(0, 0);
        }, error => {
           
          this.alertService.error(error);
          window.scroll(0, 0);
        });
       }
   }
btnadd(){
  this.listshow=false;
}
btnEdit(customer:Customer ){
   
  this.Customer=customer;
  this.listshow=false;
  this.registerForm.addControl('customerId', new FormControl('', Validators.required));
  this.registerForm.controls['customerName'].patchValue(customer.customerName);
  this.registerForm.controls['customerNameBangla'].patchValue(customer.customerNameBangla);
  this.registerForm.controls['phoneNumber'].patchValue(customer.phoneNumber);
  this.registerForm.controls['address'].patchValue(customer.address);
  this.registerForm.controls['email'].patchValue(customer.email);
  this.registerForm.controls['webAddress'].patchValue(customer.webAddress);
  this.registerForm.controls['fax'].patchValue(customer.email);
  this.registerForm.controls['customerId'].patchValue(customer.customerId);
  this.listshow=false;
}
btnDelete(customer:Customer ){
  this.Customer=customer;
  this.registerForm.addControl('Id', new FormControl('', Validators.required));
  this.registerForm.controls['customerName'].patchValue(customer.customerName);
  this.registerForm.controls['customerNameBangla'].patchValue(customer.customerNameBangla);
  this.registerForm.controls['phoneNumber'].patchValue(customer.phoneNumber);
  this.registerForm.controls['address'].patchValue(customer.address);
  this.registerForm.controls['email'].patchValue(customer.email);
  this.registerForm.controls['webAddress'].patchValue(customer.webAddress);
  this.registerForm.controls['fax'].patchValue(customer.email);
  this.customerService.delete(this.registerForm.value).subscribe(result => {

    this.alertService.success("Success Delete");
    this.getCustomer();
    this.listshow=true;
    this.onReset();
      window.scroll(0, 0);
  }, error => {
     
    this.alertService.error(error);
    window.scroll(0, 0);
  });

}
getCustomer(){
   
    this.customerService.getAll().subscribe(result => {
       
        console.log(result);
        this.customerall = result as Customer[];
        this.dtTrigger.next();
    }, error => {
      console.error(error)
      this.alertService.error(error);
      window.scroll(0, 0);
    });;
    }
    onReset() {
      this.submitted = false;
      this.registerForm.reset();
      this.listshow=true
  }
}
