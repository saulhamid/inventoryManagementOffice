import { Component, OnInit, OnDestroy } from '@angular/core';
import { Designation } from '../../_models/setup/Designation';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { designationService } from '../../_services/setup/designationService.service';
import { AlertService } from '../../_services';
import { CompanyService } from '../../_services/setup/companyservice.service';
import { Company } from '../../_models/setup/company';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ngx-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class designationComponent implements OnDestroy, OnInit {

  constructor( private http: HttpClient, private designationService: designationService,private alertService:AlertService,  private companyService: CompanyService,
    private formBuilder: FormBuilder) { }
    registerForm: FormGroup;
  submitted = false;
  designationall  : Designation[];
  Designation : Designation;
  listshow=true;
  companyall  : Company[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  ngOnInit() {
    this.listshow=true
    this.getBranch();
    this.getcompany();
    this.registerForm = this.formBuilder.group({
      designationName: ['', Validators.required],
      // companyId: ['0', Validators.required],
      // Address: ['', Validators.required],
      // Phone: ['', Validators.required],
      // Mobile: ['', Validators.pattern],
      // Fax: [''],
      // VatRegNo: ['']
  });
  this.registerForm.controls['companyId'].patchValue('0');
  const that = this;
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
       debugger
       // stop here if form is invalid
       if (this.registerForm.invalid) {
           return;
       }
      //  if(this.registerForm.controls['companyId'].value == null || this.registerForm.controls['companyId'].value == '0') 
      //  {
      //   this.alertService.error("Company Required");
      //   return;
      //  }
       if(!this.Designation){
        this.designationService.Create(this.registerForm.value).subscribe(result => {
           
          this.alertService.success("Success Insert");
          //this.getBranch();
          this.getDesination();
          this.onReset();
          this.listshow=true;
            window.scroll(0, 0);
        }, error => {
           
          this.alertService.error(error);
          window.scroll(0, 0);
        });
       }else{
        this.designationService.udate(this.registerForm.value).subscribe(result => {
           
          this.alertService.success("Success Update");
          //this.getBranch();
          this.getDesination();
          this.onReset();
            window.scroll(0, 0);
        }, error => {
           
          this.alertService.error("Not Update");
          window.scroll(0, 0);
        });
       }
       
   }
btnadd(){
  this.listshow=false;
  this.registerForm.controls['companyId'].patchValue('0');
}
// btnEdit(branch:Designation ){
   
//   this.Branch=branch;
//   this.listshow=false;
//   this.registerForm.addControl('id', new FormControl('', Validators.required));
//   this.registerForm.controls['branchName'].patchValue(branch.branchName);
//   this.registerForm.controls['companyId'].patchValue(branch.companyId);
//   this.registerForm.controls['id'].patchValue(branch.id);
//   this.registerForm.controls['Address'].patchValue(branch.address);
//   this.registerForm.controls['Fax'].patchValue(branch.fax);
//   this.registerForm.controls['Mobile'].patchValue(branch.mobile);
//   this.registerForm.controls['Phone'].patchValue(branch.phone);
//   this.registerForm.controls['VatRegNo'].patchValue(branch.vatRegNo);
//   this.listshow=false;
// }
// btnDelete(branch:Designation ){
//   this.Branch=branch;
//   this.registerForm.addControl('id', new FormControl('', Validators.required));
//   this.registerForm.controls['branchName'].patchValue(branch.branchName);
//   this.registerForm.controls['companyId'].patchValue(branch.companyId);
//   this.registerForm.controls['id'].patchValue(branch.id);
  
//   this.branchService.delete(this.registerForm.value).subscribe(result => {
  
//     this.alertService.success("Success Delete");
//     this.getBranch();
//     this.listshow=true;
//     this.onReset();
//       window.scroll(0, 0);
//   }, error => {
     
//     this.alertService.error("Not Delete");
//     window.scroll(0, 0);
//   });
// this.getBranch();
// }
getBranch(){
  this.designationService.getAll().subscribe(result => {
     
      console.log(result);
      this.designationall = result as Designation[];
      this.dtTrigger.next();
  }, error => {
    console.error(error)
    this.alertService.error("Data Not Found");
    window.scroll(0, 0);
  });;

  
  }


  getDesination(){
    this.designationService.getAll().subscribe(result => {
       
        console.log(result);
        this.designationall = result as Designation[];
        this.dtTrigger.next();
    }, error => {
      console.error(error)
      this.alertService.error("Data Not Found");
      window.scroll(0, 0);
    });
  
    
    }
    
    getcompany(){
       
        this.companyService.getAll().subscribe(result => {
           
            console.log(result);
            this.companyall = result as Company[];
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
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

