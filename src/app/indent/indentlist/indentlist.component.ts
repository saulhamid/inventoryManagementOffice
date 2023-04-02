import { Component, OnInit, TemplateRef } from '@angular/core';
import { AlertService } from '../../_services';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Indentmaster } from '../../_models/indent/indentmaster';
import { Indentservice } from '../../_services/indent/indentservice.service';
import { Product } from '../../_models/setup/Product';
import { ProductService } from '../../_services/setup/productService.service';
import { IndentDetail } from '../../_models/indent/indentDetail';
import { parse } from 'path';
import { NbDialogService } from '@nebular/theme';
//import { Subject } from 'rxjs';
import { EmployeeService } from '../../_services/setup/employeeService.service';
import { Employee } from '../../_models/setup/employee';
import { TramsconditionService } from '../../_services/setup/tramsconditionService.service';
import { Tramscondition } from '../../_models/setup/termscondition';
import { Requisitionmaster } from '../../_models/requisition/requisitionmaster';
import { Requisitionservice } from '../../_services/requisition/requisitionservice.service';

import { Subject, Observable, of } from 'rxjs';

@Component({
  selector: 'ngx-indentlist',
  templateUrl: './indentlist.component.html',
  styleUrls: ['./indentlist.component.scss']
})
export class IndentlistComponent implements OnInit {
  employeeall: Employee[];

  productnamelist: Product[];

  constructor(  private indentmasterService: Indentservice,private alertService:AlertService,  private productService: ProductService,
    private formBuilder: FormBuilder,private dialogService: NbDialogService,private employeeService:EmployeeService,
    private tramsconditoinService: TramsconditionService,private RequisitionmasterService: Requisitionservice) { }
    registerForm: FormGroup;
  submitted = false;
  public indentmasterall  : Indentmaster[];
  public indentmaster : Indentmaster;
  public indentDetail: IndentDetail;
  public indentDetailall: IndentDetail[];
  productId:string;
  qty:string;
  listshow=true;
  productall  : Product[];
  tramsncondition  : Tramscondition[];
  productmodel:Product;
  btndisable:boolean;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  Requisitionmasterall:Requisitionmaster[];

  filteredNgModelOptions$: Observable<Product[]>;
  ngOnInit() {
    this.listshow=true;
    this.getIndentmaster();
    //this.getproduct();
    this.getEmployee();
    this.getTramsnCondition();

    this.filteredNgModelOptions$ = of(this.productnamelist);
    
    this.registerForm = this.formBuilder.group({
    });
    this.productId='';
    this.qty='0';
    this.btndisable=true;
    this.indentmaster=new Indentmaster;
    this.indentmaster.employeeId='';
    this.indentmaster.date  = new Date();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }
  config = {
    size: "lg"
  };
   // convenience getter for easy access to form fields
   get f() { return this.registerForm.controls; }
   onSubmit() {
      
       this.submitted = true;
       // stop here if form is invalid
      // if (this.registerForm.invalid) {
     //   return;
    // }
    //console.log("Datatatata: "+document.getElementById("editIndentQuantity").value);
  
      console.log(this.indentmaster);
        this.indentmasterService.Create(this.indentmaster).subscribe(result => {
           
          this.alertService.success("Success Insert");
          this.getIndentmaster();
          this.onReset();
          this.listshow=true;
            window.scroll(0, 0);
        }, error => {
           
          this.alertService.error(error);
          window.scroll(0, 0);
        });
}
getTramsnCondition( ){
this.tramsncondition=[];
  this.tramsconditoinService.findId('1').subscribe(result => {
    console.log(result);
    this.tramsncondition=result as Tramscondition[];
  }, error => {
     
    this.alertService.error(error);
  });
}
onProductChange(searchValue: string): void {  
  this.productId=searchValue;
  this.qty=this.productall.filter(item => item.productId==searchValue).map(e=> e.reOrderlevel)[0];
  this.btnchecked()
}
onQTYChange(searchValue: string): void {  
  if(parseInt(this.productall.filter(item => item.productId).map(e=> e.maxOrder)[0]) < parseInt(searchValue)){
  this.qty=this.productall.filter(item => item.productId==searchValue).map(e=> e.reOrderlevel)[0];
  this.btnchecked();
  this.alertService.error("Max order Over");
  }else{this.qty=searchValue;}
}
btnadd(){
  this.listshow=false;
  this.indentmaster= new Indentmaster;
  this.indentmaster.date  = new Date();
  this.indentmaster.employeeId='';
  this.getproduct();
}
btnEdit(indentmasteri:Indentmaster ){
   
  this.indentmaster=indentmasteri;
  this.listshow=false;
}
btnDelete(indentmaster:Indentmaster ){
  this.alertService.confirmation().onClose.subscribe(name => {
    if(name==true){
  this.indentmaster=indentmaster;
  this.indentmasterService.delete(this.indentmaster).subscribe(result => {
    this.alertService.success("Success Delete");
    this.getIndentmaster();
    this.listshow=true;
    this.onReset();
      window.scroll(0, 0);
  }, error => {
    this.alertService.error(error);
    window.scroll(0, 0);
  });
}
});
}
btnaddProduct(){
  this.productId = this.productId.split('_')[0];


  this.productmodel = this.productall.filter((item) => item.productId ==  this.productId ).map(a => a)[0];
//   if(this.productmodel.minOrder > this.qty){
//    this.alertService.error("Minmum Quantity "+this.productmodel.minOrder);
//    this.qty=this.productmodel.minOrder;
//    return; 
//  }
//   if(this.productmodel.maxOrder < this.qty){
//    this.alertService.error("Maximum Quantity "+this.productmodel.maxOrder);
//    this.qty=this.productmodel.minOrder;
//    return; 
//  }
    if(typeof this.indentmaster.indentDetails === "undefined"){
    this.indentmaster.indentDetails=[];}
    
    if(this.qty=='0'){this.alertService.warn("Please Enter Quantity"); return; }
    if(this.productId==''){this.alertService.warn("Please Select Product");this.productId=''; return; }
    this.indentDetail=new IndentDetail();
    this.indentDetail.productName = this.productall.filter((item) => item.productId == this.productId).map(function(a) {return a.productName;}).toString();
    this.indentDetail.productid=this.productId;
    this.indentDetail.qty=this.qty;
    this.indentmaster.indentDetails.push(this.indentDetail);
    this.productall=this.productall.filter((item) => item.productId != this.productId);
    this.qty='0';this.productId='';
    this.indentmaster.date  = new Date();
}

btndetproduct(searchValue: string): void { 
  this.indentmaster.indentDetails = this.indentmaster.indentDetails.filter(({ productid }) => productid !== searchValue);  
  this.getproduct();
  this.productall.push(this.productall.filter((item) => item.productId == searchValue).map(function(a) {return a;})[0]);     
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
    });;
    }
    btnTransfer(Id:string,ref){
      debugger
      this.indentmasterService.requisitionToinden(Id).subscribe(result => {
          console.log(result);
          this.indentmasterall = result as Indentmaster[];
          this.dtTrigger.next();
          ref.close()
      }, error => {
        console.error(error)
        this.alertService.error(error);
        window.scroll(0, 0);
      });;
      }
    getproduct(){
       
        this.productService.getAll().subscribe(result => {
           
            console.log(result);
            this.productall = result as Product[];
            this.productnamelist=this.productall
        }, error => {
          console.error(error)
          this.alertService.error(error);
          window.scroll(0, 0);
        });;
    }
    getEmployee(){
       
        this.employeeService.getAll().subscribe(result => {
           
            console.log(result);
            this.employeeall = result as Employee[];
        }, error => {
          console.error(error)
          this.alertService.error(error);
          window.scroll(0, 0);
        });;
    }
    onReset() {
      //console.log("Datatatata: "+document.getElementById("editIndentQuantity").value);
      this.submitted = false;
      this.getIndentmaster();
      this.listshow=true
  }
  btnchecked(){
   if(this.productId !='0' && this.qty != '0') {
     this.btndisable=false;
   }
  }
  open2(dialog: TemplateRef<any>,date) {
    this.btnaddFromRequsition()
    this.dialogService.open(
      dialog,
      {context:date,  dialogClass:'lg'});
  }
  btnaddFromRequsition(){
    this.RequisitionmasterService.getAllApprovedTransfer().subscribe(result => {
      console.log(result);
      this.Requisitionmasterall = result as Requisitionmaster[];
  }, error => {
    console.error(error)
    this.alertService.error(error);
    window.scroll(0, 0);
  });;

  }
  // OpenDeatail(RequisitionD){
  //   RequisitionD.showdetail=!RequisitionD.showdetail;
    
  // }
  private filter(value: string): Product[] {
    const filterValue = value.toLowerCase().trim();
    //toLowerCase().
    var data=this.productnamelist.filter(optionValue => optionValue.productName.toLowerCase().includes(filterValue));
    return data;
  }

  onModelChange(value: string) {
    this.filteredNgModelOptions$ = of(this.filter(value));
  }
}