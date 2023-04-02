import { Component, OnInit } from '@angular/core';
import { Indentservice } from '../../_services/indent/indentservice.service';
// import { AlertService } from '../../_services';
import { Indentmaster } from '../../_models/indent/indentmaster';
import { indentProceesPOVM } from '../../_models/indent/indentProceesPOVM';
import { SupplierProductService } from '../../_services/setup/SupplierProductService.service';
import { SupplierProduct } from '../../_models/setup/supplierproduct';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-indenttopo',
  templateUrl: './indenttopo.component.html',
  styleUrls: ['./indenttopo.component.scss']
})
export class IndenttopoComponent implements OnInit {
  indentmasterall: Indentmaster[];
  indentProceespovmall: indentProceesPOVM[];
  supplierProductall: SupplierProduct[];
  supplierall: SupplierProduct[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  //private alertService:AlertService,
  constructor(private indentmasterService: Indentservice,
    private supplierProductService:SupplierProductService) { }
  ngOnInit(): void {

this.getSupplierProduct();
this.dtOptions = {
  pagingType: 'full_numbers',
  pageLength: 10,
  processing: true
};
  }
  onSubmit(){
     debugger;
    this.indentProceespovmall;
   this.indentmasterService.CreatePurchaseorder(this.indentProceespovmall).subscribe(result => {
       
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
      getSupplierProductById(productid){
         debugger
    var data=this.supplierProductall.filter(item=>item.productId==productid);
      return data;
    };
}