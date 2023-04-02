import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from '../../_services';
import { UOM } from '../../_models/setup/UOM';
import { UOMService } from '../../_services/setup/uomService.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-uom',
  templateUrl: './uom.component.html',
  styleUrls: ['./uom.component.scss']
})
export class UOMComponent implements OnInit {

  constructor(  private uOMService: UOMService,private alertService:AlertService,
    private formBuilder: FormBuilder) { }
    registerForm: FormGroup;
  submitted = false;
  uOMall  : UOM[];
  UOM : UOM;
  listshow=true;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  ngOnInit() {
    this.listshow=true
    this.getUOM();
    this.registerForm = this.formBuilder.group({
      uOMName: ['', Validators.required]
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
       if(!this.UOM){
        this.uOMService.Create(this.registerForm.value).subscribe(result => {
           
          this.alertService.success("Success Insert");
          this.getUOM();
          this.onReset();
          this.listshow=true;
            window.scroll(0, 0);
        }, error => {
           
          this.alertService.error(error);
          window.scroll(0, 0);
        });
       }else{
        this.uOMService.udate(this.registerForm.value).subscribe(result => {
           
          this.alertService.success("Success Update");
          this.getUOM();
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
btnEdit(uOM:UOM ){
   
  this.UOM=uOM;
  this.listshow=false;
  this.registerForm.addControl('id', new FormControl(''));
  this.registerForm.controls['uOMName'].patchValue(uOM.uomName);
  this.registerForm.controls['id'].patchValue(uOM.id);
  this.listshow=false;
}
btnDelete(UOM:UOM ){
  this.UOM=UOM;
  this.registerForm.addControl('id', new FormControl(''));
  this.registerForm.setValue({
    uOMName: UOM.uomName,
    id: UOM.id
  });
  this.uOMService.delete(this.registerForm.value).subscribe(result => {
  
    this.alertService.success("Success Delete");
    this.getUOM();
    this.listshow=true;
    this.onReset();
      window.scroll(0, 0);
  }, error => {
     
    this.alertService.error(error);
    window.scroll(0, 0);
  });

}
getUOM(){
   
    this.uOMService.getAll().subscribe(result => {
       
        console.log(result);
        this.uOMall = result as UOM[];
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
