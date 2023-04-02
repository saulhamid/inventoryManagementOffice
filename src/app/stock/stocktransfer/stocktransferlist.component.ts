import { Component, OnInit, TemplateRef } from '@angular/core';
import { AlertService } from '../../_services';
import { Subject } from 'rxjs';
import { NbDialogService } from '@nebular/theme';
import { SupplierService } from '../../_services/setup/supplierService.service';
import { Supplier } from '../../_models/setup/Supplier';
import { Tramscondition } from '../../_models/setup/termscondition';
import { TramsconditionService } from '../../_services/setup/tramsconditionService.service';
import { Stocktransfer } from '../../_models/stock/stocktransfer';
import { StocktransferService } from '../../_services/stock/stocktransfer.service';
import { Branch } from '../../_models/setup/Branch';
import { Company } from '../../_models/setup/company';
import { BranchService } from '../../_services/setup/branchService.service';
import { CompanyService } from '../../_services/setup/companyservice.service';
import { Product } from '../../_models/setup/Product';
import { ProductService } from '../../_services/setup/productService.service';
import { StockTransferDetails } from '../../_models/stock/stocktransferdetail';

@Component({
  selector: 'ngx-stocktransferlist',
  templateUrl: './stocktransferlist.component.html',
  styleUrls: ['./stocktransferlist.component.scss']
})
export class stocktransferlistComponent implements OnInit {
  stocktransferorderall: Stocktransfer[];
  stocktransferfilter:Stocktransfer;
  stocktransferall: Stocktransfer[];
  stocktransferdetail: StockTransferDetails;
  stocktransferdetails: StockTransferDetails[];
  stocktransfer: Stocktransfer;
  branchall:Branch[];
  FrombranchCompany:Branch[];
  TobranchCompany:Branch[];
  companyall:Company[];
  tocompanyall:Company[];
  btndisable:boolean;
  productId:string;
  FromCompanyId:string;
  ToCompanyId:string;
  qty:number;
  StockQty:number;
  productall  : Product[];
  tramsncondition: Tramscondition[];
  constructor(private dialogService: NbDialogService,private stocktransferService: StocktransferService,private alertService:AlertService,private companyService:CompanyService
    ,private branchService: BranchService,  private productService: ProductService) { }
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  ngOnInit(): void {
    this.getstocktransfer();
    this.getBranch();
    this.getcompany();
   this.StockQty=0;
   this.qty=0;
this.stocktransfer=new Stocktransfer;
this.stocktransferdetail=new StockTransferDetails;
this.stocktransfer.stocktransferdetails=[];
this.stocktransfer.FromBranchId=0;
this.stocktransfer.ToBranchId=0;
this.stocktransfer.FromCompanyId=0;
this.stocktransfer.ToCompanyId=0;
this.productId='0';
    this.stocktransferfilter=new Stocktransfer;
    this.stocktransferfilter.TransferDate=new Date();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

  }
  getstocktransfer(){
     
    this.stocktransferorderall =[];
      this.stocktransferService.getAll().subscribe(result => {
         
          console.log(result);
          this.stocktransferorderall = result as Stocktransfer[];
      }, error => {
        console.error(error)
        this.alertService.error(error);
        window.scroll(0, 0);
      });;
      }

      open2(dialog: TemplateRef<any>,date) {
        this.dialogService.open(
          dialog,
          { context: date });
      }
  
      onResetfilter(){
        this.stocktransferfilter=new Stocktransfer
        this.stocktransferfilter.TransferDate=new Date();
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
getFromBranchByCompany(companyId){
  this.FrombranchCompany= null;
this.FrombranchCompany= this.branchall.filter(e=>e.companyId==companyId) as Branch[];
this.stocktransfer.ToCompanyId=0;
this.stocktransfer.ToBranchId=0;
}
getTOBranchByCompany(companyId){
  this.TobranchCompany= null;
  this.TobranchCompany= this.branchall.filter(e=>e.companyId==companyId && e.id!= this.stocktransfer.FromBranchId)as Branch[];
  }
onSubmit(){
  debugger
  if(this.stocktransfer.FromBranchId==0)
  {
    this.alertService.warn("Please Select From Branch");
    return;
  }
  if(this.stocktransfer.FromCompanyId==0)
  {
    this.alertService.warn("Please Select From Company");
    return;
  }
  if(this.stocktransfer.ToCompanyId==0)
  {
    this.alertService.warn("Please Select To Company");
    return;
  }
  if(this.stocktransfer.ToBranchId==0)
  {
    this.alertService.warn("Please Select To Branch");
    return;
  }
  if(this.stocktransfer.stocktransferdetails.length == 0)
  {
    this.alertService.warn("Please Add Product");
    return;
  }
  this.stocktransferService.Create(this.stocktransfer).subscribe(result => {
    this.alertService.success("Success Insert");
    
    this.onReset();
    this.getstocktransfer();
    //this.listshow=true;
      window.scroll(0, 0);
  }, error => {
    this.alertService.error(error);
    window.scroll(0, 0);
  });
}
onReset(){
  this.stocktransfer=null;
}
btnaddProduct(){
  this.stocktransferdetail=new StockTransferDetails;
  if(this.productId == '' || typeof this.productId === 'undefined'){
    this.alertService.error("Please Select Product ");
    return; 
  }
   if(this.qty==0){
    this.alertService.error("Please Enter Quantity ");
    return; 
  }
 var data= this.productall.filter(e=>e.productCode==this.productId)[0]
  this.stocktransferdetail.productId=data.productId;
  this.stocktransferdetail.productCode=data.productCode;
  this.stocktransferdetail.productName=data.productName;
  this.stocktransferdetail.STQty=this.qty;
  this.stocktransferdetail.StockQty=this.StockQty;
  this.stocktransfer.stocktransferdetails.push(this.stocktransferdetail)
  this.productall=this.productall.filter(e=>e.productCode!=data.productCode);
  this.productId='0';
  this.StockQty=0;
  this.qty=0;
}
btndetproduct(productCode){
  this.stocktransfer.stocktransferdetails= this.stocktransfer.stocktransferdetails.filter(e=>e.productCode != productCode);
  this.getproduct(this.FrombranchCompany);
}
getproduct(BranchId){
  this.stocktransferService.getSelectAllStockByBranch(BranchId).subscribe(result => {
      console.log(result);
      this.productall = result as Product[];
  }, error => {
    console.error(error)
    this.alertService.error(error);
    window.scroll(0, 0);
  });;
}
getChangeProduct(productCode){
 this.StockQty= this.productall.filter(e=>e.productCode==productCode)[0].pstock;
}
}
