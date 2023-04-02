import { Component, OnInit, TemplateRef } from '@angular/core';
import { Purchaseorder } from '../../_models/purchase/purchaseorder';
import { Purchaseorderdetail } from '../../_models/purchase/purchaseorderdetail';
import { Supplier } from '../../_models/setup/Supplier';
import { AlertService } from '../../_services';
import { NbDialogService } from '@nebular/theme';
import { FormBuilder } from '@angular/forms';
import { ProductService } from '../../_services/setup/productService.service';
import { SupplierService } from '../../_services/setup/supplierService.service';
import { SupplierProductService } from '../../_services/setup/SupplierProductService.service';
import { SupplierProduct } from '../../_models/setup/supplierproduct';
import { Product } from '../../_models/setup/Product';
import { Purchaseorderservice } from '../../_services/purchase/purchaseorderservice';
import { Subject } from 'rxjs';
import { Tramscondition } from '../../_models/setup/termscondition';
import { TramsconditionService } from '../../_services/setup/tramsconditionService.service';

@Component({
  selector: 'ngx-purchaseorder',
  templateUrl: './purchaseorder.component.html',
  styleUrls: ['./purchaseorder.component.scss']
})
export class PurchaseorderComponent implements OnInit {
purchaseorder:Purchaseorder;
  supplierall: Supplier[];
 
  price:string;
  qty:string
  productId:string;
  Productall: Product[];
  supplierProductall: SupplierProduct[];
  purchaseOrder:Purchaseorder;
purchaseOrderdetail:Purchaseorderdetail;
  submitted: boolean;
  productmodel: Product;
  Total: number;
  Purchaseorderall: Purchaseorder[];
  tramsncondition: Tramscondition[];
  constructor(private alertService:AlertService,  private productService: ProductService,
    private formBuilder: FormBuilder,private dialogService: NbDialogService,private supplierService:SupplierService,
    private supplierproductService:SupplierProductService,private purchaseorderservice:Purchaseorderservice
    ,private tramsconditoinService: TramsconditionService) { }
  listshow :boolean
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  ngOnInit(): void {
    this.listshow=true;
    this.purchaseorder=new Purchaseorder;
    this.purchaseorder.purchaseOrderDetails=[];
    this.getTramsnCondition();
    this.productId='0';
    this.getSupplier();
    this.getPurchase();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
  }
  btnadd(){
    this.listshow=false;
    this.purchaseorder=new Purchaseorder;
    this.purchaseorder.purchaseOrderDetails=[];
    this.purchaseorder.pODate=new Date();
    this.purchaseorder.supId='0';
  }
  getPurchase(){
    this.Purchaseorderall =[];
      this.purchaseorderservice.getAllNotApproved().subscribe(result => {
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
      getTramsnCondition( ){
        this.tramsncondition=[];
          this.tramsconditoinService.findId('2').subscribe(result => {
            console.log(result);
            this.tramsncondition=result as Tramscondition[];
          }, error => {
             
            this.alertService.error(error);
          });
        }
      getProductBySup(productid:string){
        this.supplierProductall=[];
         
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
             ;
            this.purchaseorder.purchaseOrderDetails=[];
            this.Productall=[];
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
           
              this.listshow=true
          }
          btndetproduct(searchValue: string): void { 
            var data = this.purchaseorder.purchaseOrderDetails.filter(({ productId }) => productId == searchValue)[0];
            this.Total=-(Number(data.CPU)*Number(data.pOQty));
            this.purchaseorder.purchaseOrderDetails = this.purchaseorder.purchaseOrderDetails.filter(({ productId }) => productId !== searchValue);  
            this.Productall.push(this.Productall.filter((item) => item.productId == searchValue).map(function(a) {return a;})[0]);     
          }
          open2(dialog: TemplateRef<any>,date) {
            this.dialogService.open(
              dialog,
              { context: date });
          }
        }