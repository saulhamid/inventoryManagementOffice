import { Component, OnInit } from '@angular/core';
import { Indentservice } from '../../_services/indent/indentservice.service';
 import { AlertService } from '../../_services';
import { Indentmaster } from '../../_models/indent/indentmaster';
import { indentProceesPOVM } from '../../_models/indent/indentProceesPOVM';
import { SupplierProductService } from '../../_services/setup/SupplierProductService.service';
import { SupplierProduct } from '../../_models/setup/supplierproduct';
import { Supplier } from '../../_models/setup/Supplier';
import { Product } from '../../_models/setup/Product';
import { ProductService } from '../../_services/setup/productService.service';
import { SupplierService } from "../../_services/setup/supplierService.service";
//import { Subject, Observable } from 'rxjs';
import { Subject, Observable, of } from 'rxjs';
import { find } from 'rxjs-compat/operator/find';
// import {  IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'ngx-indenttoponew',
  templateUrl: './indenttoponew.component.html',
  styleUrls: ['./indenttoponew.component.scss']
})
export class IndenttoponewComponent implements OnInit {
  // dropdownSettings:IDropdownSettings;


  indentmasterall: Indentmaster[];
  indentProceespovmall: indentProceesPOVM[];
  indentProceespovmalldata: indentProceesPOVM[] = [];
  supplierProductall: SupplierProduct[];
  suppliersListAll: Supplier[];
  supplierall: SupplierProduct[];
  productall: Product[];
  productSelected = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  supplierId:any;
  productId:string;
  filteredNgModelOptions$: Observable<indentProceesPOVM[]>;
  //private alertService:AlertService,
  constructor(private indentmasterService: Indentservice,
    private supplierProductService:SupplierProductService, private alertService:AlertService, private productService: ProductService, private supplierService: SupplierService) { }
  ngOnInit(): void {
    this.getAllSupller();
    this.supplierId="0";
// this.getSupplierProduct();

this.filteredNgModelOptions$ = of(this.indentProceespovmall);

this.dtOptions = {
  pagingType: 'full_numbers',
  pageLength: 10,
  processing: true
};
this.productId='';
  }
  onSubmit(){
     debugger;
     this.alertService.confirmation().onClose.subscribe(name=>{
      if(name==true)
      {
              this.indentProceespovmall;
              if(this.supplierId=="0")
              {
                alert("Supplier Not Selected")
                return;
              }

              this.indentProceespovmalldata.map((obj) => {
                obj.supplierid = this.supplierId;
                return obj;
            })
            this.indentmasterService.CreatePurchaseorder(this.indentProceespovmalldata).subscribe(result => {
                
                //this.alertService.success("Success Insert");
                window.location.reload();
                this.getIndentmaster();
                  window.scroll(0, 0);
              }, error => {
                window.location.reload();
                //this.alertService.error(error);
                window.scroll(0, 0);
              });
      }
     })
    
  }

  buttonAddClick(){
    debugger
     console.log(this.indentProceespovmall)
     console.log(this.productId)
     console.log("supplier_id: "+this.supplierId)

     this.productId = this.productId.split('_')[0];

     console.log(this.productId)

     console.log(this.indentProceespovmalldata)
    //  this.indentProceespovmalldata.
     var aa =  this.indentProceespovmall.filter((e)=>e.productId==this.productId)
      
     this.indentProceespovmalldata.push(aa[0])
     //this.indentProceespovmall = this.indentProceespovmall.filter(item=>item.productId!=this.productId)

     this.indentProceespovmall = this.indentProceespovmall.filter(val=>!this.indentProceespovmalldata.includes(val))
     console.log(aa)
     console.log(this.indentProceespovmall)
     this.productId = '';
  }

  getProduct() {
    this.productService.getAll().subscribe(result => {
      console.log(result);
      this.productall = result as Product[];
      //this.productnamelist = this.productall.map(e => e.productName);
      this.dtTrigger.next();
    }, error => {
      console.error(error)
      //this.alertService.error(error);
      window.scroll(0, 0);
    });;
  }

  getIndentmaster(){
    this.indentProceespovmall=null;
      this.indentmasterService.getprocessPO().subscribe(result => {
         
          console.log(result);
          this.indentProceespovmall = result as indentProceesPOVM[];
         this.indentProceespovmall.forEach(function (value) {
           value.poqty=value.qty;
           value.porate=value.cpu;
          }); 
          this.dtTrigger.next();
      }, error => {
        console.error(error)
       // this.alertService.error(error);
        window.scroll(0, 0);
      });;

      }
      onSelectProduct(productId){
       // this.indentProceespovmall=null;
       this.indentProceespovmalldata = [];

       this.productSelected.push(productId)
        console.log(this.productSelected)
        debugger
        // productId.forEach(e=>{
        //   this.indentProceespovmall.filter((item)=>item.productid==e).forEach(a=>{
        //     this.indentProceespovmalldata.push(a);
        //   })
        // })
        // var data = this.indentProceespovmall.forEach((e)=>{
        //   e.productid=productId
        // })
        productId.forEach(i=>{
          debugger
          (this.indentProceespovmall.filter(e=>e.productId==i)).forEach(a=>{
            this.indentProceespovmalldata.push(a)
          })
        })
         
        //return data
      }

      btnDeleteFromList(searchValue:indentProceesPOVM){
        debugger;
        console.log(searchValue)

        for (var i = this.indentProceespovmalldata.length - 1; i >= 0; i--) {
          if (this.indentProceespovmalldata[i].productId === searchValue.productId && this.indentProceespovmalldata[i].indentId === searchValue.indentId) {
            this.indentProceespovmall.push(searchValue);
            this.indentProceespovmalldata.splice(i, 1);
          }
         }

      }


      getSupplierProduct(){
          this.supplierProductService.getAll().subscribe(result => {
             
              console.log(result);
              this.supplierProductall = result as SupplierProduct[];
              this.getIndentmaster();
          }, error => {
            console.error(error)
            //this.alertService.error(error);
            window.scroll(0, 0);
          });;
          }

          getAllSupller(){
            debugger
            this.supplierService.getAll().subscribe(result => {
             
              console.log(result);
              this.suppliersListAll = result as Supplier[];
              this.getIndentmaster();
          }, error => {
            console.error(error)
            //this.alertService.error(error);
            window.scroll(0, 0);
          });;
          }
          
      getSupplierProductById(productid){
        // debugger
    var data=this.supplierProductall.filter(item=>item.productId==productid);
      return data;
    };

    private filter(value: string): indentProceesPOVM[] {
      const filterValue = value.toLowerCase().trim();
      //.toLowerCase()
      var data=this.indentProceespovmall.filter(optionValue => optionValue.productName.toLowerCase().includes(filterValue));
      return data;
    }


    onModelChange(value: string) {
      this.filteredNgModelOptions$ = of(this.filter(value));
    }
}