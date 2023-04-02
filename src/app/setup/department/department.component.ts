import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../_services/setup/departmentService.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from '../../_services';
import { Department } from '../../_models/setup/department';
import { Branch } from '../../_models/setup/Branch';
import { BranchService } from '../../_services/setup/branchService.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  constructor(  private departmentService: DepartmentService,private alertService:AlertService,private branchService: BranchService,
    private formBuilder: FormBuilder) { }
    registerForm: FormGroup;
  submitted = false;
  departmentall  : Department[];
  branchall  : Branch[];
  Department : Department;
  listshow=true;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  ngOnInit() {
    this.listshow=true
    this.getDepartment();
    this.getBranch();
    this.registerForm = this.formBuilder.group({
      deptName: ['', Validators.required],
      branchId: ['', Validators.required],
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
       if(!this.Department){
        this.departmentService.Create(this.registerForm.value).subscribe(result => {
           
          this.alertService.success("Success Insert");
          this.getDepartment();
          this.listshow=true;
            window.scroll(0, 0);
        }, error => {
           
          this.alertService.error(error);
          window.scroll(0, 0);
        });
       }else{
        this.departmentService.udate(this.registerForm.value).subscribe(result => {
           
          this.alertService.success("Success Update");
          this.getDepartment();
          this.listshow=true;
            window.scroll(0, 0);
        }, error => {
           
          this.alertService.error(error);
          window.scroll(0, 0);
        });
       }
       
   }
btnadd(){
  this.listshow=false;
  this.registerForm.reset();
  this.registerForm.controls['branchId'].patchValue('0');
}
btnEdit(department:Department ){
   
  this.Department=department;
  this.listshow=false;
  this.registerForm.addControl('id', new FormControl(''));
  this.registerForm.setValue({
    deptName: department.deptName,
    id: department.id,
    branchId: department.branchId
  });
  this.listshow=false;
}
btnDelete(department:Department ){
   
  this.Department=department;
  this.registerForm.addControl('id', new FormControl(''));
  this.registerForm.setValue({
    deptName: department.deptName,
    id: department.id,
    branchId: department.branchId
  });
  this.departmentService.delete(this.registerForm.value).subscribe(result => {
    this.getDepartment();
    this.alertService.success("Success Delete");
      window.scroll(0, 0);
  }, error => {
     
    this.alertService.error(error);
    window.scroll(0, 0);
  });

}
getDepartment(){
   
    this.departmentService.getAll().subscribe(result => {
       
        console.log(result);
        this.departmentall = result as Department[];
        this.dtTrigger.next();
    }, error => {
      console.error(error)
      this.alertService.error(error);
      window.scroll(0, 0);
    });;
    }
    getBranch(){
       
        this.branchService.getAll().subscribe(result => {
           
            console.log(result);
            this.branchall = result as Branch[];
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
