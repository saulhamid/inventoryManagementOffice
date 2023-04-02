import { Component, OnInit, TemplateRef } from '@angular/core';
import { Purchaseorderservice } from '../../_services/purchase/purchaseorderservice';
import { AlertService } from '../../_services';
import { NbDialogService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { Supplier } from '../../_models/setup/Supplier';
import { SupplierService } from '../../_services/setup/supplierService.service';
import { SupplierProduct } from '../../_models/setup/supplierproduct';
import { Purchaseretunservice } from '../../_services/purchase/purchaseretunservice';
import { PurchaseReturn } from '../../_models/purchase/purchaseReturn';
import { PurchaseReturndetail } from '../../_models/purchase/purchaseReturndetail';
import { Product } from '../../_models/setup/Product';
import { Purchaseorderdetail } from '../../_models/purchase/purchaseorderdetail';
import { Purchaseorder } from '../../_models/purchase/purchaseorder';
import { Datepickerfrom } from '../../_models/requisition/datepickerfrom';

@Component({
  selector: 'ngx-purchaeavglist',
  templateUrl: './purchaeavglist.component.html'
})
export class PurchaeavglistComponent implements OnInit {
  purchaseReturn: PurchaseReturn;
  purchaseReturnfilter: PurchaseReturn;
  Purchaseorderall: Purchaseorder[];
  purchasefilter:Purchaseorder;
  purchaseReturnall: PurchaseReturn[];
  supplierall: Supplier[];
  supplierProduct:SupplierProduct[];
  productall:Product[];
  listshow :boolean;
  productId: string;
  qty: any;
  fromDate:any;
  toDate:any;
  purchaseReturnDetail: any;
  purchaseReturndetailall: Purchaseorderdetail[];
  purchaseReturndetail: PurchaseReturndetail;
  Total: number;
  constructor(private dialogService: NbDialogService,private purchaseorderService: Purchaseorderservice,private alertService:AlertService
    ,private supplierService:SupplierService ,private purchaseretunservice:Purchaseretunservice) { }
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  ngOnInit(): void {
    this.getPurchase();
    this.getSupplier();
    this.listshow=true;
    this.purchaseReturnfilter=new PurchaseReturn;
    this.purchaseReturn=new PurchaseReturn;
    this.purchaseReturn.PRDT=new Date();
    this.purchaseReturn.SupId='0';
    this.purchaseReturnfilter.SupId='0';
    this.fromDate='';
    this.toDate='';
    this.productId='0';
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
this.qty='1';
this.Total=0;
  }
  getPurchase(){
     
    this.Purchaseorderall =null;
    debugger
      this.purchaseorderService.getAllAvgPurchase().subscribe(result => {
         
          console.log(result);
          this.purchaseReturnDetail = result ;
          this.dtTrigger.next();
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
      filtersubmit(){
         ;
        this.purchaseReturnall =[];
        this.purchaseretunservice.getAllpurchaseReturnFilter(this.purchaseReturnfilter.invoice,this.purchaseReturnfilter.PRDT,this.purchaseReturnfilter.SupId).subscribe(result => {
           
            console.log(result);
            this.purchaseReturnall = result as PurchaseReturn[];
            this.dtTrigger[0].next();
        }, error => {
          console.error(error)
          this.alertService.error(error);
          window.scroll(0, 0);
        });
      }
      onResetfilter(){
        this.purchaseReturn=new PurchaseReturn;
        this.purchaseReturn.PRDT=new Date();
        this.purchaseReturn.SupId='0';
      }
      onSubmit(){
        console.log(this.purchaseReturn);
        this.purchaseretunservice.Create(this.purchaseReturn).subscribe(result => {
           
          this.alertService.success("Success Insert");
          this.getPurchase();
          this.onReset();
          this.listshow=true;
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
          }, error => {
            console.error(error)
            this.alertService.error(error);
            window.scroll(0, 0);
          });;
          }
          getproductSupplier(SuppilerId){
             
              this.supplierService.getProductSupplierId(SuppilerId).subscribe(result => {
                 
                  console.log(result);
                  this.productall = result as Product[];
              }, error => {
                console.error(error)
                this.alertService.error(error);
                window.scroll(0, 0);
              });;
              }
              onSelect(categoryID) {
                this.supplierService.getProductSupplierId(categoryID).subscribe(result => {
                   
                    console.log(result);
                    this.productall = result as Product[];
                }, error => {
                  console.error(error)
                  this.alertService.error(error);
                  window.scroll(0, 0);
                });
              }
          btnadd(){
            this.listshow=false;
          }
          onReset() {
            this.listshow=true
        }
        onaddProduct(){
          this.purchaseReturndetail=new PurchaseReturndetail();
           
          var productdata = this.productall.filter((item) => item.productId ==  this.productId ).map(a => a)[0];
          if(productdata.pstock < this.qty ){
            this.alertService.error("Minmum Quantity "+productdata.pstock);
            return; 
          }
          if(this.qty == 0){
           this.alertService.error("Minmum Quantity 1");
           return; 
         }
              this.purchaseReturndetail.productName= productdata.productName.toString();
              this.purchaseReturndetail.CPU= productdata.cpu.toString();
             // this.purchaseOrderdetail.uOMName= this.supplierProduct.filter(item=>item.productId===this.productId).map(e=>e.uOMName).toString();
              this.purchaseReturndetail.productId=this.productId;
              this.purchaseReturndetail.PRQty=this.qty;
              this.purchaseReturn.purchaseReturnDetails.push(this.purchaseReturndetail);
             this.productall=this.productall.filter((item) => item.productId != this.productId);
              this.Total=this.Total+(Number(this.purchaseReturndetail.CPU)*Number(this.qty));
              this.qty='1';this.productId='0';
        }
        btndetproduct(searchValue: string): void { 
           
          var data = this.purchaseReturn.purchaseReturnDetails.filter(({ productId }) => productId == searchValue)[0];
          this.Total=this.Total-(Number(data.CPU)*Number(data.PRQty));
          this.purchaseReturn.purchaseReturnDetails = this.purchaseReturn.purchaseReturnDetails.filter(({ productId }) => productId !== searchValue);  
          this.productall.push(this.productall.filter((item) => item.productId == searchValue).map(function(a) {return a;})[0]);     
        }

        convert(str:Date){
          var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
          return ([date.getFullYear(), mnth, day].join("-")) ;
        }
        onDatePicker(){
          this.fromDate = this.convert(this.fromDate)
          this.toDate = this.convert(this.toDate)
          //console.log(this.convert(this.fromDate));
          //console.log(this.convert(this.toDate));
          console.log(this.fromDate)
            console.log(this.toDate)
          let data1:Datepickerfrom = {
            fromDate: this.fromDate,
            toDate: this.toDate
          }  
        
          this.purchaseReturnDetail = [];
        
        debugger;
          this.purchaseorderService.postAllAvgPurchaseWithDate(data1).subscribe(result=>{
           
            this.purchaseReturnDetail = result ;
            console.log(result)
           },error=>{
            console.log(error);
           })
          
           //this.fromDate='';
          // this.toDate='';
        
        }
}
