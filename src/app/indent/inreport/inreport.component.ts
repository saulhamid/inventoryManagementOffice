import { Component, OnInit } from '@angular/core';
import { Indentservice } from '../../_services/indent/indentservice.service';
import { AlertService } from '../../_services';
import { ProductService } from '../../_services/setup/productService.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { Indentmaster } from '../../_models/indent/indentmaster';
import { IndentDetail } from '../../_models/indent/indentDetail';
import { Product } from '../../_models/setup/Product';
import { Subject } from 'rxjs';
import { BranchService } from '../../_services/setup/branchService.service';
import { DepartmentService } from '../../_services/setup/departmentService.service';
import { SectionService } from '../../_services/setup/sectionService.service';
import { Branch } from '../../_models/setup/Branch';
import { Department } from '../../_models/setup/department';
import { Section } from '../../_models/setup/section';
import { EmployeeService } from '../../_services/setup/employeeService.service';
import { Employee } from '../../_models/setup/employee';

@Component({
  selector: 'ngx-inreport',
  templateUrl: './inreport.component.html',
  styleUrls: ['./inreport.component.scss']
})
export class InreportComponent implements OnInit {
  branchall: Branch[];
  departmentall: Department[];
  defilter: Department[];
  sectionall: Section[];
  sefilter: Section[];
  emfilter: Employee[];
  employeeall: Employee[];
  constructor(  private indentmasterService: Indentservice,private alertService:AlertService,  private productService: ProductService,
    private formBuilder: FormBuilder,private dialogService: NbDialogService,
    private branchService: BranchService,private departmentService: DepartmentService,private sectionService:SectionService,private employeeService: EmployeeService, ) { }
    registerForm: FormGroup;
  submitted = false;
  public indentmasterall  : Indentmaster[];
  public indentmaster : Indentmaster;
  public indentfiler : Indentmaster;
  public indentDetail: IndentDetail;
  public indentDetailall: IndentDetail[];
  productId:string;
  qty:string;
  productall  : Product[];
  productmodel:Product;
  btndisable:boolean;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  reportType:string[];
  statuses = Array<{id: number, text: string}>();
  ngOnInit() {
    this.getIndentmaster();
    this.getproduct();
    this.getDepartment();
    this.getSection();
    this.getEmployee();
    this.getBranch();
    this.indentfiler=new Indentmaster;
    this.reportType=['SectionWise','DeparmentWise','EmployeeWise'];
    this.indentfiler.rptType='SectionWise';
    this.registerForm = this.formBuilder.group({
    });
    this.productId='0';
    this.qty='0';
    this.btndisable=true;
    this.indentmaster=new Indentmaster;
   
    this.indentmaster.date  = new Date();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.statuses = [
      {id: 1, text: 'Not Approved'},
      {id: 2, text: 'Approved'},
      {id: 3, text: 'Procurment'},
  ];
  }
   // convenience getter for easy access to form fields
   get f() { return this.registerForm.controls; }
   onSubmit() {
  
   }
   filtersubmit(){
    this.indentmasterall =[];
    this.indentfiler.status=this.indentfiler.status == null ? '':this.indentfiler.status.toString();
    this.indentfiler.departmentId=this.indentfiler.departmentId == null ? '':this.indentfiler.departmentId.toString();
    this.indentfiler.sectionId=this.indentfiler.sectionId == null ? '':this.indentfiler.sectionId.toString();
    this.indentfiler.employeeId= this.indentfiler.employeeId == null ? '': this.indentfiler.employeeId.toString();
    var date= this.indentfiler.date == null ? '' : this.indentfiler.date.toLocaleDateString();
    this.indentmasterService.getAllIndentFilter(this.indentfiler.status,this.indentfiler.departmentId,this.indentfiler.sectionId,this.indentfiler.employeeId,date,this.indentfiler.rptType).subscribe(result => {
       
        console.log(result);
        this.indentmasterall = result as Indentmaster[];
    }, error => {
      console.error(error)
      this.alertService.error(error);
      window.scroll(0, 0);
    });
   }
   opeonrpt(){
    this.indentfiler.status=this.indentfiler.status == null ? '':this.indentfiler.status.toString();
    this.indentfiler.departmentId=this.indentfiler.departmentId == null ? '':this.indentfiler.departmentId.toString();
    this.indentfiler.sectionId=this.indentfiler.sectionId == null ? '':this.indentfiler.sectionId.toString();
    this.indentfiler.employeeId= this.indentfiler.employeeId == null ? '': this.indentfiler.employeeId.toString();
    var date= this.indentfiler.date == null ? '' : this.indentfiler.date.toLocaleDateString();
    this.indentmasterService.downloadPdf(this.indentfiler.status,this.indentfiler.departmentId,this.indentfiler.sectionId,this.indentfiler.employeeId,date,this.indentfiler.rptType).subscribe((data: Blob) => {
      let fileURL = window.URL.createObjectURL(data);
      window.open(fileURL);
  });
  }
  onResetfilter(){
     
  }
getIndentmaster(){
   
    this.indentmasterService.getAll().subscribe(result => {
       
        console.log(result);
        this.indentmasterall = result as Indentmaster[];
        this.dtTrigger.next();
    }, error => {
      console.error(error)
      this.alertService.error(error);
      window.scroll(0, 0);
    });
    }
    getproduct(){
       
        this.productService.getAll().subscribe(result => {
           
            console.log(result);
            this.productall = result as Product[];
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
    getDepartment(){
       
        this.departmentService.getAll().subscribe(result => {
           
            console.log(result);
            this.departmentall = result as Department[];
            this.defilter = result as Department[];
        }, error => {
          console.error(error)
          this.alertService.error(error);
          window.scroll(0, 0);
        });;
    }
    getSection(){
       
        this.sectionService.getAll().subscribe(result => {
           
            console.log(result);
            this.sectionall = result as Section[];
            this.sefilter = result as Section[];
        }, error => {
          console.error(error)
          this.alertService.error(error);
          window.scroll(0, 0);
        });
    }
    getEmployee(){
       
        this.employeeService.getAll().subscribe(result => {
           
            console.log(result);
            this.employeeall = result as Employee[];
            this.emfilter = result as Employee[];
        }, error => {
          console.error(error)
          this.alertService.error(error);
          window.scroll(0, 0);
        });;
    }
onBranchChange(value){
this.defilter=this.departmentall;
this.sefilter=this.sectionall;
this.emfilter=this.employeeall;
if(value.length > 0){
this.defilter= this.departmentall.filter(e=> value.includes(e.branchId));
this.sefilter= this.sectionall.filter(e=> value.includes(e.branchId));
this.emfilter= this.employeeall.filter(e=> value.includes(e.branchId));
}
}
    onDepartChange(value){
       
      this.emfilter= this.employeeall.filter(e=> value.includes(e.departmentId));
    }
    onSectionChange(value){
       
      this.emfilter= this.employeeall.filter(e=> value.includes(e.sectionId));
    }
    onReset(){
      this.submitted = false;
      this.registerForm.reset();
    }
}
