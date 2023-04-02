import { Component, OnInit } from '@angular/core';
import { Purchaseorder } from '../../_models/purchase/purchaseorder';
import { Supplier } from '../../_models/setup/Supplier';
import { Product } from '../../_models/setup/Product';
import { SupplierProduct } from '../../_models/setup/supplierproduct';
import { Purchaseorderdetail } from '../../_models/purchase/purchaseorderdetail';
import { AlertService } from '../../_services';
import { ProductService } from '../../_services/setup/productService.service';
import { SupplierService } from '../../_services/setup/supplierService.service';
import { FormBuilder } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { SupplierProductService } from '../../_services/setup/SupplierProductService.service';
import { Subject } from 'rxjs';
import { Purchaseorderservice } from '../../_services/purchase/purchaseorderservice';

@Component({
  selector: 'ngx-purorderreport',
  templateUrl: './purorderreport.component.html',
  styleUrls: ['./purorderreport.component.scss']
})
export class PurorderreportComponent implements OnInit {

  purchaseorder:Purchaseorder;
  supplierall: Supplier[];
 
  price:string;
  qty:string
  productId:string;
  Productall: Product[];
  supplierProductall: SupplierProduct[];
  purchaseOrder:Purchaseorder;
  purOrderfilter:Purchaseorder;
  purchaseOrderdetail:Purchaseorderdetail;
  submitted: boolean;
  productmodel: Product;
  Total: number;
  Purchaseorderall: Purchaseorder[];
  reportType: string[];
  constructor(private alertService:AlertService,  private productService: ProductService,
    private formBuilder: FormBuilder,private dialogService: NbDialogService,private supplierService:SupplierService,
    private supplierproductService:SupplierProductService,private purchaseorderservice:Purchaseorderservice) { }
  listshow :boolean
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  statuses = Array<{id: number, text: string}>();
  ngOnInit(): void {
    this.listshow=true;
    this.purchaseorder=new Purchaseorder;
    this.purOrderfilter=new Purchaseorder;
    this.purchaseorder.purchaseOrderDetails=[];
    this.productId='0';
    this.getSupplier();
    this.getPurchase();
    this.reportType=['DateWise','SupplierWise'];
    this.purOrderfilter.rptType='DateWise';
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.statuses = [
      {id: 1, text: 'Order'},
      {id: 2, text: 'Receiveed'},
      {id: 3, text: 'QC'},
  ];
  }
  filtersubmit(){
    this.Purchaseorderall =[];
    this.purOrderfilter.supId=this.purOrderfilter.supId == null ? '':this.purOrderfilter.supId.toString();
    this.purOrderfilter.status=this.purOrderfilter.status == null ? '':this.purOrderfilter.status.toString();
    this.purOrderfilter.startDate=this.convert(this.purOrderfilter.startDate);
    this.purOrderfilter.endDate=this.convert(this.purOrderfilter.endDate);
    this.purchaseorderservice.getAllpurchaseOrderFilter(this.purOrderfilter.status,this.purOrderfilter.supId,this.purOrderfilter.startDate,this.purOrderfilter.endDate,this.purOrderfilter.rptType).subscribe(result => {
       
        console.log(result);
        this.Purchaseorderall = result as Purchaseorder[];
        this.dtTrigger.next();
    }, error => {
      console.error(error)
      this.alertService.error(error);
      window.scroll(0, 0);
    });
   }
  btnadd(){
    this.listshow=false;
    this.purchaseorder=new Purchaseorder;
    this.purchaseorder.purchaseOrderDetails=[];
    this.purchaseorder.pODate=new Date();
    this.purchaseorder.supId='0';
  }
  getPurchase(){
     
      this.purchaseorderservice.getAll().subscribe(result => {
         
          console.log(result);
          this.Purchaseorderall = result as Purchaseorder[];
          this.dtTrigger.next();
      }, error => {
        console.error(error)
        this.alertService.error(error);
        window.scroll(0, 0);
      });;
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
      getProductBySup(productid:string){
         
          this.supplierproductService.getAll().subscribe(result => {
             
              console.log(result);
              this.supplierProductall = result as SupplierProduct[];
          }, error => {
            console.error(error)
            this.alertService.error(error);
            window.scroll(0, 0);
          });
          }
          onSelect(categoryID) {
            this.supplierproductService.getProductbysupId(categoryID).subscribe(result => {
               
                console.log(result);
                this.Productall = result as Product[];
            }, error => {
              console.error(error)
              this.alertService.error(error);
              window.scroll(0, 0);
            });
          }
          onProductChange(searchValue: string): void {  
            this.price=  this.Productall.filter(item=>item.productId==searchValue).map(e=>e.cpu).toString();
            this.qty=  this.Productall.filter(item=>item.productId==searchValue).map(e=>e.minOrder).toString();
            }
            onaddProduct(){
              this.productmodel = this.Productall.filter((item) => item.productId ==  this.productId ).map(a => a)[0];
              if(this.productmodel.minOrder > this.qty){
               this.alertService.error("Minmum Quantity "+this.productmodel.minOrder);
               this.qty=this.productmodel.minOrder;
               return; 
             }
              if(this.productmodel.maxOrder < this.qty){
               this.alertService.error("Maximum Quantity "+this.productmodel.maxOrder);
               this.qty=this.productmodel.minOrder;
               return; 
             }
              this.purchaseOrderdetail=new Purchaseorderdetail;
              this.purchaseOrderdetail.productName= this.Productall.filter(item=>item.productId===this.productId).map(e=>e.productName).toString();
              this.purchaseOrderdetail.uOMName= this.Productall.filter(item=>item.productId===this.productId).map(e=>e.uOMName).toString();
              this.purchaseOrderdetail.productId=this.productId;
              this.purchaseOrderdetail.pOQty=this.qty;
              this.purchaseOrderdetail.CPU=this.price;
              this.purchaseorder.purchaseOrderDetails.push(this.purchaseOrderdetail);
              this.Productall=this.Productall.filter((item) => item.productId != this.productId);
              this.Total=+(Number(this.price)*Number(this.qty));
              this.qty='0';this.productId='0';this.price='0';
            }
            onSubmit(){
              console.log(this.purchaseorder);
              this.purchaseorderservice.Create(this.purchaseorder).subscribe(result => {
                 
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
            onReset() {
              this.submitted = false;
              this.listshow=true;
          }
          btndetproduct(searchValue: string): void { 
            this.purchaseorder.purchaseOrderDetails = this.purchaseorder.purchaseOrderDetails.filter(({ productId }) => productId !== searchValue);  
            this.Productall.push(this.Productall.filter((item) => item.productId == searchValue).map(function(a) {return a;})[0]);     
          }
          opeonrpt(){
             ;
            this.purOrderfilter.supId=this.purOrderfilter.supId == null ? '':this.purOrderfilter.supId.toString();
            this.purOrderfilter.status=this.purOrderfilter.status == null ? '':this.purOrderfilter.status.toString();
            this.purOrderfilter.startDate=this.purOrderfilter.startDate == 'NaN-aN-aN' ? '':this.convert(this.purOrderfilter.startDate);
            this.purOrderfilter.endDate=this.purOrderfilter.endDate == 'NaN-aN-aN' ? '':this.convert(this.purOrderfilter.endDate);
            this.purchaseorderservice.downloadPdf(this.purOrderfilter.status,this.purOrderfilter.supId,this.purOrderfilter.startDate,this.purOrderfilter.endDate,this.purOrderfilter.rptType).subscribe((data: Blob) => {
              let fileURL = window.URL.createObjectURL(data);
              window.open(fileURL);
          });
          }
          onResetfilter(){
             
          }
           convert(str) {
            var date = new Date(str),
              mnth = ("0" + (date.getMonth() + 1)).slice(-2),
              day = ("0" + date.getDate()).slice(-2);
            return [date.getFullYear(), mnth, day].join("-");
          }
}
