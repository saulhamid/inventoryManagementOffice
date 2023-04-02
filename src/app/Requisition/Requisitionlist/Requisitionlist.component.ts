import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
// import { Subject } from 'rxjs';
import { RequisitionDetail } from '../../_models/requisition/RequisitionDetail';
import { Requisitionmaster } from '../../_models/requisition/requisitionmaster';
import { Subject, Observable, of } from 'rxjs';
import { Employee } from '../../_models/setup/employee';
import { Product } from '../../_models/setup/Product';
import { Tramscondition } from '../../_models/setup/termscondition';
import { AlertService } from '../../_services';

import { Requisitionservice } from '../../_services/requisition/requisitionservice.service';
import { GlobalsetupService } from '../../_services/setup/globalSetup.service'
import { EmployeeService } from '../../_services/setup/employeeService.service';
import { ProductService } from '../../_services/setup/productService.service';
import { TramsconditionService } from '../../_services/setup/tramsconditionService.service';
import { Designation } from '../../_models/setup/Designation';
import { designationService } from '../../_services/setup/designationService.service';
import { designationVM } from '../../_models/designationVM';
import { EnvGlobalSetup } from '../../_models/setup/globalsetup';

@Component({
  selector: 'ngx-Requisition',
  templateUrl: './Requisitionlist.component.html',
  styleUrls: ['./Requisitionlist.component.scss']
})
export class RequisitionlistComponent implements OnInit {
  employeeall: Employee[];
  productnamelist: Product[];
  productFilter : Product;
  employeeAllSelected : any[];
  empDesignSelected: any;
  designationEmpNameall  : designationVM[];
  globalSetupAll: EnvGlobalSetup[];


  constructor(  private RequisitionmasterService: Requisitionservice, private globalsetupService: GlobalsetupService, private alertService:AlertService,  private productService: ProductService, private designationService: designationService,
    private formBuilder: FormBuilder,private dialogService: NbDialogService,private employeeService:EmployeeService,
    private tramsconditoinService: TramsconditionService) { }
    registerForm: FormGroup;
  submitted = false;
  public Requisitionmasterall  : Requisitionmaster[];
  public Requisitionmaster : Requisitionmaster;
  public RequisitionDetail: RequisitionDetail;
  public RequisitionDetailall: RequisitionDetail[];
  productId:string;
  qty:string;
  listshow=true;
  productall  : Product[];
  tramsncondition  : Tramscondition[];
  productmodel:Product;
  btndisable:boolean;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  remarks: any;

  filteredNgModelOptions$: Observable<Product[]>;

  ngOnInit() {
    this.listshow=true;
    this.getRequisitionmaster();
    //this.getproduct();
    this.getEmployee();
    this.getTramsnCondition();
    this.getDesination();
    this.getGlobalSetup();

    this.filteredNgModelOptions$ = of(this.productnamelist);
    this.registerForm = this.formBuilder.group({
    });
    this.productId='';
    this.qty='0';
    this.btndisable=true;
    this.Requisitionmaster=new Requisitionmaster;
    this.Requisitionmaster.employeeId='';
    this.productFilter=new Product;
    this.remarks = '';

    

    this.Requisitionmaster.rDT  = new Date();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      processing: true,
      // destroy:true
    };
  }
 
   // convenience getter for easy access to form fields
   get f() { return this.registerForm.controls; }
   onSubmit() {
    debugger;
       this.submitted = true;
       this.Requisitionmaster.employees = this.employeeAllSelected;
       //this.Requisitionmaster.assignOne = this.empDesignSelected;
       //this.Requisitionmaster.remarks = this.remarks;

    if(this.Requisitionmaster.employeeId==null ||this.Requisitionmaster.employeeId=='' )
    {
      this.alertService.info("Please Select Employee");
      return;
    }
    if(this.Requisitionmaster.requisitionId == null){
      console.log(this.Requisitionmaster);
       

        this.RequisitionmasterService.CreateNewPdf(this.Requisitionmaster).subscribe((data: Blob) => {
          this.onReset();
          //this.getRequisitionmaster();
          let fileURL = window.URL.createObjectURL(data);
          window.open(fileURL);
          //window.location.reload();
          
        }, error => {
          this.alertService.error(error);
          window.scroll(0, 0);
        });




      }else{
        console.log(this.Requisitionmaster);
        //this.RequisitionmasterService.udate(this.Requisitionmaster).subscribe(result => {
        this.RequisitionmasterService.udateDetails(this.Requisitionmaster).subscribe(result => {
           
          this.alertService.success("Success Update");
          this.getRequisitionmaster();
          this.onReset();
          this.listshow=true;
            window.scroll(0, 0);
        }, error => {
           
          this.alertService.error(error);
          window.scroll(0, 0);
        });
      }
}
getTramsnCondition( ){
this.tramsncondition=[];
  this.tramsconditoinService.findId('1').subscribe(result => {
    console.log(result);
    this.tramsncondition=result as Tramscondition[];
  }, error => {
  
  });
}
onProductChange(searchValue: string): void {  
 // this.productId=searchValue;
  //this.qty=this.productall.filter(item => item.productId==searchValue).map(e=> e.reOrderlevel)[0];
 // this.btnchecked()
}





getDesination(){
  this.designationService.getEmpnameWithDesignation().subscribe(result => {
     
      console.log(result);
      this.designationEmpNameall = result as designationVM[];
      //this.dtTrigger.next();
  }, error => {
    console.error(error)
    this.alertService.error("Data Not Found");
    window.scroll(0, 0);
  });

  
  }
  onSelect(designationId){
    debugger;
    this.employeeAllSelected=designationId
    
    
  }
  // onSelectAssign(designationId){
  //   debugger
  //   this.empDesignSelected = designationId;
  // }


onQTYChange(searchValue: string): void {  
  if(parseInt(this.productall.filter(item => item.productId).map(e=> e.maxOrder)[0]) < parseInt(searchValue)){
  this.qty=this.productall.filter(item => item.productId==searchValue).map(e=> e.reOrderlevel)[0];
  this.btnchecked();
  this.alertService.error("Max order Over");
  }else{this.qty=searchValue;}
}
btnadd(){
  this.listshow=false;
  this.Requisitionmaster= new Requisitionmaster;
  this.Requisitionmaster.rDT  = new Date();
  this.Requisitionmaster.employeeId='';
  this.getproduct();
  this.productId='';
}
btnEdit(requisitionmasteri:Requisitionmaster ){
   debugger
  this.Requisitionmaster=requisitionmasteri;
  this.Requisitionmaster.requisitionDetails=requisitionmasteri.requisitionDetails

  // var approvebySecond = this.Requisitionmaster.approvedByTwo;
  // approvebySecond = approvebySecond.split(',')
  // this.Requisitionmaster.approvedByTwo = approvebySecond
  this.listshow=false;
}
btnView(requisitionmasteri:Requisitionmaster ){
   
  this.Requisitionmaster=requisitionmasteri;
  this.Requisitionmaster.requisitionDetails=requisitionmasteri.requisitionDetails

  // var approvebySecond = this.Requisitionmaster.approvedByTwo;
  // approvebySecond = approvebySecond.split(',')
  // this.Requisitionmaster.approvedByTwo = approvebySecond


  this.listshow=false;
  const saveBtn = document.getElementById('saveBtn')
  saveBtn.style.display = 'none';
}
btnDelete(Requisitionmaster:Requisitionmaster ){
this.alertService.confirmation().onClose.subscribe(name => {
if(name==true){
  debugger
  this.Requisitionmaster=Requisitionmaster;
  this.RequisitionmasterService.delete(this.Requisitionmaster).subscribe(result => {
    this.alertService.success("Success Delete");
    this.getRequisitionmaster();
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
   debugger;
  // console.log();
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
    if(typeof this.Requisitionmaster.requisitionDetails === "undefined"){
    this.Requisitionmaster.requisitionDetails=[];}
    if(this.qty=='0'){this.alertService.warn("Please Enter Quantity"); return; }
    if(this.productId=='0'){this.alertService.warn("Please Select Product");this.productId='0'; return; }
    this.RequisitionDetail=new RequisitionDetail();
    this.RequisitionDetail.productName = this.productall.filter((item) => item.productId == this.productId).map(function(a) {return a.productName;}).toString();
    this.RequisitionDetail.productId=this.productId;
    this.RequisitionDetail.rQty=this.qty;
    this.Requisitionmaster.requisitionDetails.push(this.RequisitionDetail);
    this.productall=this.productall.filter((item) => item.productId != this.productId);
    this.qty='0';this.productId='';
    this.Requisitionmaster.rDT  = new Date();
}

btndetproduct(searchValue: string): void { 
   debugger;
  this.Requisitionmaster.requisitionDetails = this.Requisitionmaster.requisitionDetails.filter(({ productId }) => productId !== searchValue);  
  this.getproduct();
  this.productall.push(this.productall.filter((item) => item.productId == searchValue).map(function(a) {return a;})[0]);     
}
getRequisitionmaster(){
   
    this.RequisitionmasterService.getAll().subscribe(result => {
       
        console.log(result);
        this.Requisitionmasterall = result as Requisitionmaster[];
        this.dtTrigger.next();
    }, error => {
      console.error(error)
      //this.alertService.error(error);
      window.scroll(0, 0);
    });;
    }
    getproduct(){
       
        this.productService.getAllByBranch().subscribe(result => {
           
            console.log(result);
            this.productall = result as Product[];
            // this.productnamelist=this.productall.map(e=>e.productName);
            this.productnamelist=this.productall//.map(e=>e.productName);
        }, error => {
          console.error(error)
          //this.alertService.error(error);
          window.scroll(0, 0);
        });;
    }
    getEmployee(){
       
        this.employeeService.getAll().subscribe(result => {
           
            console.log(result);
            this.employeeall = result as Employee[];
        }, error => {
          console.error(error)
          //this.alertService.error(error);
          window.scroll(0, 0);
        });;
    }
    onReset() {
      this.submitted = false;
      this.getRequisitionmaster();
      this.listshow=true
  }
  btnchecked(){
   if(this.productId !='0' && this.qty != '0') {
     this.btndisable=false;
   }
  }

  private filter(value: string): Product[] {
    const filterValue = value.toLowerCase().trim();
    //toLowerCase().
    var data=this.productnamelist.filter(optionValue => optionValue.productName.toLowerCase().includes(filterValue));
    return data;
  }

  onModelChange(value: string) {
    this.filteredNgModelOptions$ = of(this.filter(value));
  }

  getGlobalSetup(){
      this.globalsetupService.getAll().subscribe(result => {
           debugger
        this.globalSetupAll = result as EnvGlobalSetup[];
        console.log("All Data Global Setup")
        console.log(result)
      }, error => {
         
        this.alertService.error(error);
        window.scroll(0, 0);
      });
  }
 
}