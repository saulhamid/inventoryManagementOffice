import { Component, OnInit } from '@angular/core';
import { Supplier } from '../../_models/setup/Supplier';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SupplierService } from '../../_services/setup/supplierService.service';
import { AlertService } from '../../_services';
import { Subject } from 'rxjs';
@Component({
  selector: 'ngx-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  constructor(  private supplierService: SupplierService, private alertService: AlertService,
    private formBuilder: FormBuilder) { }
    registerForm: FormGroup;
  submitted = false;
  supplierall  : Supplier[];
  Supplier : Supplier;
  listshow=true;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  ngOnInit() {
    this.listshow = true;
    this.getSupplier();
    this.registerForm = this.formBuilder.group({
      supplierName: ['', Validators.required],
      mobile: ['', Validators.pattern],
      address: ['', Validators.required],
      email: ['', Validators.pattern],
      contactPerson: [''],
  });
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10,
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
       if(!this.Supplier){
        this.supplierService.Create(this.registerForm.value).subscribe(result => {
           ;
          this.alertService.success('Success Insert');
          this.getSupplier();
          this.onReset();
          this.listshow = true;
            window.scroll(0, 0);
        }, error => {
           
          this.alertService.error(error);
          window.scroll(0, 0);
        });
       }else{
        this.supplierService.udate(this.registerForm.value).subscribe(result => {
           
          this.alertService.success('Success Update');
          this.getSupplier();
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
btnEdit(supplier:Supplier ){
   
  this.Supplier=supplier;
  this.listshow=false;
  this.registerForm.addControl('id', new FormControl('', Validators.required));
  this.registerForm.controls['supplierName'].patchValue(supplier.supplierName);
  this.registerForm.controls['mobile'].patchValue(supplier.mobile);
  this.registerForm.controls['address'].patchValue(supplier.address);
  this.registerForm.controls['email'].patchValue(supplier.email);
  this.registerForm.controls['contactPerson'].patchValue(supplier.contactPerson);
  this.registerForm.controls['id'].patchValue(supplier.id);
  this.listshow=false;
}
btnDelete(supplier:Supplier ){
   
  this.Supplier=supplier;
  this.registerForm.addControl('id', new FormControl('', Validators.required));
  this.registerForm.controls['supplierName'].patchValue(supplier.supplierName);
  this.registerForm.controls['mobile'].patchValue(supplier.mobile);
  this.registerForm.controls['address'].patchValue(supplier.address);
  this.registerForm.controls['email'].patchValue(supplier.email);
  this.registerForm.controls['contactPerson'].patchValue(supplier.contactPerson);
  this.registerForm.controls['id'].patchValue(supplier.id);
  this.supplierService.delete(this.registerForm.value).subscribe(result => {

    this.alertService.success("Success Delete");
    this.getSupplier();
    this.listshow=true;
    this.onReset();
      window.scroll(0, 0);
  }, error => {
     
    this.alertService.error(error);
    window.scroll(0, 0);
  });

}
getSupplier(){
   
    this.supplierService.getAll().subscribe(result => {
       
        console.log(result);
        this.supplierall = result as Supplier[];
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
