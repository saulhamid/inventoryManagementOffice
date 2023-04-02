import { Component, OnInit } from '@angular/core';
import { TramsconditionService } from '../../_services/setup/tramsconditionService.service';
import { AlertService } from '../../_services';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Tramscondition } from '../../_models/setup/termscondition';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-termcondition',
  templateUrl: './termcondition.component.html',
  styleUrls: ['./termcondition.component.scss']
})
export class TermconditionComponent implements OnInit {

  constructor(  private tramsconditoinService: TramsconditionService,private alertService:AlertService,
    private formBuilder: FormBuilder) { }
    registerForm: FormGroup;
  submitted = false;
  tramsconditoinall  : Tramscondition[];
  Tramsconditoin : Tramscondition;
  listshow=true;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  ngOnInit() {
    this.listshow=true
    this.getTramsconditoin();
    this.registerForm = this.formBuilder.group({
      description: ['', Validators.required],
      type: ['', Validators.required],
  });
  this.registerForm.controls['type'].patchValue('0');
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
       if(!this.Tramsconditoin){
        this.tramsconditoinService.Create(this.registerForm.value).subscribe(result => {
           
          this.alertService.success("Success Insert");
          this.getTramsconditoin();
          this.onReset();
          this.listshow=true;
            window.scroll(0, 0);
        }, error => {
           
          this.alertService.error(error);
          window.scroll(0, 0);
        });
       }else{
        this.tramsconditoinService.udate(this.registerForm.value).subscribe(result => {
           
          this.alertService.success("Success Update");
          this.getTramsconditoin();
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
btnEdit(tramsconditoin:Tramscondition ){
   
  this.Tramsconditoin=tramsconditoin;
  this.listshow=false;
  this.registerForm.addControl('id', new FormControl('', Validators.required));
  this.registerForm.controls['description'].patchValue(tramsconditoin.description);
  this.registerForm.controls['type'].patchValue(tramsconditoin.type);
  this.registerForm.controls['id'].patchValue(tramsconditoin.id);
  this.listshow=false;
}
btnDelete(tramsconditoin:Tramscondition ){
  this.Tramsconditoin=tramsconditoin;
  this.registerForm.addControl('id', new FormControl('', Validators.required));
  this.registerForm.controls['description'].patchValue(tramsconditoin.description);
  this.registerForm.controls['type'].patchValue(tramsconditoin.type);
  this.registerForm.controls['id'].patchValue(tramsconditoin.id);
  this.tramsconditoinService.delete(this.registerForm.value).subscribe(result => {
    this.alertService.success("Success Delete");
    this.getTramsconditoin();
    this.listshow=true;
    this.onReset();
      window.scroll(0, 0);
  }, error => {
     
    this.alertService.error(error);
    window.scroll(0, 0);
  });

}
btnUpdate(tramsconditoin:Tramscondition ){
   
  this.Tramsconditoin=tramsconditoin;
  this.tramsconditoinService.udate(this.Tramsconditoin).subscribe(result => {
     
    this.alertService.success("Success Update");
    this.getTramsconditoin();
    this.onReset();
      window.scroll(0, 0);
  }, error => {
     
    this.alertService.error(error);
    window.scroll(0, 0);
  });
}
getTramsconditoin(){
   
    this.tramsconditoinService.getAll().subscribe(result => {
       
        console.log(result);
        this.tramsconditoinall = result as Tramscondition[];
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
