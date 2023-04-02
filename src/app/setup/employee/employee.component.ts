import { Component, OnInit,ViewChild } from '@angular/core';
import { EmployeeService } from '../../_services/setup/employeeService.service';
import { AlertService } from '../../_services';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from '../../_models/setup/employee';
import { BranchService } from '../../_services/setup/branchService.service';
import { DepartmentService } from '../../_services/setup/departmentService.service';
import { SectionService } from '../../_services/setup/sectionService.service';
import { Branch } from '../../_models/setup/Branch';
import { Section } from '../../_models/setup/section';
import { Department } from '../../_models/setup/department';
import { Subject } from 'rxjs';
import { CompanyService } from '../../_services/setup/companyservice.service';
import { Company } from '../../_models/setup/company';
import { designationService } from '../../_services/setup/designationService.service';
import { Designation } from '../../_models/setup/Designation';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'ngx-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  departmentallfilter: Department[];
  branchallfilter: Branch[];
  sectionallfilter: Section[];

  constructor(  private employeeService: EmployeeService, private alertService: AlertService, private designationService: designationService,
    private formBuilder: FormBuilder,private branchService: BranchService,private departmentService: DepartmentService,private sectionService:SectionService
    ,private companyService:CompanyService) { }
    registerForm: FormGroup;
  submitted = false;
  employeeall  : Employee[];
  employee : Employee;
  companyall:Company[];
  designationall  : Designation[];
  branchall  : Branch[];
  sectionall  : Section[];
  departmentall  : Department[];
  listshow=true;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective)
  dtElement: any;
  selectedItemsbranch=[]
  selectedItems=[]
  selectedItemsDesign=[]
  ngOnInit() {
    this.listshow = true;
    this.getEmployee();
    this.getCompany();
    this.getDesination();
    this.getDepartment();
    this.getBranch();
    //this.getSection();
    this.registerForm = this.formBuilder.group({
      employeeName: ['', Validators.required],
      mobile: ['', Validators.pattern],
      address: ['', Validators.required],
      email: ['', Validators.pattern],
      joinDate: ['', Validators.required],
      branchId: ['', Validators.required],
      departmentId: ['', Validators.required],
      CompanyIdlist: [''],
      designationIdList:['']
  });
  this.registerForm.controls['branchId'].patchValue("0");
  this.registerForm.controls['departmentId'].patchValue("0");
  this.registerForm.controls['CompanyIdlist'].patchValue("0");
  this.registerForm.controls['designationIdList'].patchValue("0");
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 25,
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
       debugger;
       if(!this.employee){
        this.registerForm.value.BranchIdlist=this.registerForm.value.branchId.toString();
        this.registerForm.value.Departmentlist=this.registerForm.value.departmentId.toString();
        this.registerForm.value.CompanyId=this.registerForm.value.CompanyIdlist.toString();
        this.registerForm.value.DesignationId=this.registerForm.value.designationIdList.toString();
        this.employeeService.Create(this.registerForm.value).subscribe(result => {
          this.alertService.success('Success Insert');
          this.getEmployee();
          this.onReset();
          this.listshow = true;
          window.scroll(0, 0);
        }, error => {
          this.alertService.error(error);
          window.scroll(0, 0);
        });
       }else{
        this.registerForm.value.branchId=this.registerForm.value.branchId.toString();
        this.registerForm.value.departmentId=this.registerForm.value.departmentId.toString();
        this.employeeService.udate(this.registerForm.value).subscribe(result => {
          this.alertService.success('Success Update');
          this.getEmployee();
          this.onReset();
            window.scroll(0, 0);
        }, error => {
          this.alertService.error(error);
          window.scroll(0, 0);
        });
       }
   }
btnadd(){
  debugger
  this.listshow=false;
  this.selectedItems = [
    '1010','12','10',
    '16','17', '18','19','20','21','22','1018'
    ];
 this.selectedItemsbranch= this.branchall;
  this.departmentallfilter= this.departmentall.filter(e=> this.selectedItems.includes(e.id));
 
}
OnCompanySelect(branchId) {
//  this.branchallfilter= this.branchall.filter(e=> branchId.includes(e.companyId));
 this.branchallfilter= this.branchall.filter(e=> branchId==e.companyId);
}
OnBranchSelect(branchId) {
  ///this.departmentallfilter= this.departmentall.filter(e=> branchId.includes(e.branchId));
  //this.departmentallfilter= this.departmentall.filter(e=> branchId==branchId);
  debugger;
  this.departmentallfilter= this.departmentall.filter(e=> branchId==e.branchId);
}
btnEdit(employee:Employee ){
   
  this.employee=employee;
  this.listshow=false;
  //this.departmentallfilter = this.departmentall.filter((item) => item.branchId ==employee.branchId);
 // this.sectionallfilter = this.sectionall.filter((item) => item.branchId == employee.branchId);
  this.registerForm.addControl('employeeId', new FormControl('', Validators.required));
  this.registerForm.controls['employeeName'].patchValue(employee.employeeName);
  this.registerForm.controls['mobile'].patchValue(employee.mobile);
  this.registerForm.controls['address'].patchValue(employee.address);
  this.registerForm.controls['email'].patchValue(employee.email);
  this.registerForm.controls['departmentId'].patchValue(employee.departmentId);
  this.registerForm.controls['joinDate'].patchValue(employee.joinDate);
  this.registerForm.controls['branchId'].patchValue(employee.branchId);
  this.registerForm.controls['employeeId'].patchValue(employee.employeeId);
  this.listshow=false;
}
btnDelete(employee:Employee ){
  this.employee=employee;
  this.registerForm.addControl('employeeId', new FormControl('', Validators.required));
  this.registerForm.controls['employeeName'].patchValue(employee.employeeName);
  this.registerForm.controls['mobile'].patchValue(employee.mobile);
  this.registerForm.controls['address'].patchValue(employee.address);
  this.registerForm.controls['email'].patchValue(employee.email);
  this.registerForm.controls['departmentId'].patchValue(employee.departmentId);
  this.registerForm.controls['joinDate'].patchValue(employee.joinDate);
  this.registerForm.controls['branchId'].patchValue(employee.branchId);
  this.registerForm.controls['employeeId'].patchValue(employee.employeeId);
  this.employeeService.delete(this.registerForm.value).subscribe(result => {
    this.alertService.success("Success Delete");
    this.getEmployee();
    this.listshow=true;
    
    // this.onReset();
      // window.scroll(0, 0);
  }, error => {
     
    this.alertService.error(error);
    window.scroll(0, 0);
  });

}
ngAfterViewInit(): void {
  this.dtTrigger.next();
}

rerender(): void {
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    // Destroy the table first
    dtInstance.destroy();
    // Call the dtTrigger to rerender again
    this.dtTrigger.next();
  });
}
getEmployee(){
    this.employeeService.getAll().subscribe(result => {
        console.log(result);
        debugger;
        this.employeeall = result as Employee[];
        this.rerender();
    }, error => {
      console.error(error)
      this.alertService.error(error);
      window.scroll(0, 0);
    });;
}
getCompany()
{
  this.companyService.getAll().subscribe(result => {
      console.log(result);
      this.companyall = result as Company[];
  }, error => {
    console.error(error)
    this.alertService.error(error);
    window.scroll(0, 0);
  });;
}
getBranch(){
    this.branchService.getAll().subscribe(result => {
        console.log(result);
        debugger;
        this.branchall = result as Branch[];
    
    }, error => {
      console.error(error)
      this.alertService.error(error);
      window.scroll(0, 0);
    });
}
getDepartment()
{
    this.departmentService.getAll().subscribe(result => {
        console.log(result);
        this.departmentall = result as Department[];
    }, error => {
      console.error(error)
      this.alertService.error(error);
      window.scroll(0, 0);
    });;
}

getDesination(){
  this.designationService.getAll().subscribe(result => {
     
      console.log(result);
      this.designationall = result as Designation[];
      //this.dtTrigger.next();
  }, error => {
    console.error(error)
    this.alertService.error("Data Not Found");
    window.scroll(0, 0);
  });
}
getSection(){
    this.sectionService.getAll().subscribe(result => {
        console.log(result);
        this.sectionall = result as Section[];
    }, error => {
      console.error(error)
      this.alertService.error(error);
      window.scroll(0, 0);
    });;
}
    onReset() {
      this.listshow=true
      this.submitted = false;
      
      this.registerForm.reset();
      
  }
}
