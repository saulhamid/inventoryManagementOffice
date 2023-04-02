import { Component, OnInit, TemplateRef } from '@angular/core';
import { Purchaseorderservice } from '../../_services/purchase/purchaseorderservice';
import { AlertService } from '../../_services';
import { Purchaseorder } from '../../_models/purchase/purchaseorder';
import { Subject } from 'rxjs';
import { NbDialogService } from '@nebular/theme';
import { SupplierService } from '../../_services/setup/supplierService.service';
import { Supplier } from '../../_models/setup/Supplier';
import { Tramscondition } from '../../_models/setup/termscondition';
import { TramsconditionService } from '../../_services/setup/tramsconditionService.service';

@Component({
  selector: 'ngx-purchaselist',
  templateUrl: './purchaselist.component.html',
  styleUrls: ['./purchaselist.component.scss']
})
export class PurchaselistComponent implements OnInit {
  Purchaseorderall: Purchaseorder[];
  purchasefilter:Purchaseorder;
  supplierall: Supplier[];
  tramsncondition: Tramscondition[];
  constructor(private dialogService: NbDialogService,private purchaseorderService: Purchaseorderservice,private alertService:AlertService,private supplierService:SupplierService
    ,private tramsconditoinService: TramsconditionService) { }
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  ngOnInit(): void {
    this.getPurchase();
    this.getSupplier();
    this.getTramsnCondition();
    this.purchasefilter=new Purchaseorder;
    this.purchasefilter.pODate=new Date();
    this.purchasefilter.supId='0';
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      processing: true
    };

  }
  getPurchase(){
     
    this.Purchaseorderall =[];
      this.purchaseorderService.getAllpurchase().subscribe(result => {
         
          console.log(result);
          this.Purchaseorderall = result as Purchaseorder[];
      }, error => {
        console.error(error)
        this.alertService.error(error);
        window.scroll(0, 0);
      });;
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
      open2(dialog: TemplateRef<any>,date) {
        this.dialogService.open(
          dialog,
          { context: date });
      }
      filtersubmit(){
        this.Purchaseorderall =[];
        this.purchaseorderService.getAllpurchaseFilter(this.purchasefilter.invoice,this.purchasefilter.pODate,this.purchasefilter.supId).subscribe(result => {
           
            console.log(result);
            this.Purchaseorderall = result as Purchaseorder[];
            this.dtTrigger.next();
        }, error => {
          console.error(error)
          this.alertService.error(error);
          window.scroll(0, 0);
        });
      }
      onResetfilter(){
        this.purchasefilter=new Purchaseorder
        this.purchasefilter.pODate=new Date();
        this.purchasefilter.supId='0';
      }
      getSupplier(){
         

          this.supplierService.getAll().subscribe(result => {
             
              console.log(result);
              this.supplierall = result as Supplier[];
              this.dtTrigger.next();
          }, error => {
            console.error(error)
            this.alertService.error(error);
            window.scroll(0, 0);
          });;
          }
}
