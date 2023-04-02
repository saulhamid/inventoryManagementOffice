import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { AlertService } from '../../_services';
import { Purchaseorder } from '../../_models/purchase/purchaseorder';
import { Product } from '../../_models/setup/Product';
import { Purchaseorderservice } from '../../_services/purchase/purchaseorderservice';
import { Subject, Observable, Subscription } from 'rxjs';  
import { DataTableDirective } from 'angular-datatables';
// import { SearchCriteria } from '../../_models/searchfilter';

@Component({
  selector: 'ngx-purchasearrived',
  templateUrl: './purchasearrived.component.html',
  styleUrls: ['./purchasearrived.component.scss']
})
export class PurchasearrivedComponent implements OnInit {
  purchaseorderall: Purchaseorder[];
  constructor(private dialogService: NbDialogService,private PurchaseorderService: Purchaseorderservice,private alertService:AlertService) { }
indentall: Product[];
dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject();
@ViewChild(DataTableDirective)
dtElement: any; 
// searchCriteria: SearchCriteria = { isPageLoad: true, filter: "" };   
timerSubscription: Subscription;    
ngAfterViewInit(): void {
  this.dtTrigger.next();
}
ngOnDestroy(): void {
  // Do not forget to unsubscribe the event
  this.dtTrigger.unsubscribe();
}
rerender(): void {
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    // Destroy the table first
    dtInstance.destroy();
    // Call the dtTrigger to rerender again
    this.dtTrigger.next();
  });
}
  ngOnInit(): void {
    this.dtOptions = {    
      pagingType: "full_numbers",    
      pageLength: 10,    
      serverSide: true,    
      processing: true,    
      searching: false,    
      ajax: (dataTablesParameters: any, callback) => {
        debugger;    
        // dataTablesParameters.searchCriteria = this.searchCriteria;    
        
      },    
      columns: [null, null, null, null, { orderable: false }]    
    };    
    this.subscribeToData();
  }
  open2(dialog: TemplateRef<any>,date) {
    this.dialogService.open(
      dialog,
      { context: date });
  }
  getPurchaseorder(){
    this.purchaseorderall =null;
      this.PurchaseorderService.getAll().subscribe(result => {
          console.log(result);
          this.purchaseorderall = result as Purchaseorder[];
          this.rerender();
      }, error => {
        console.error(error)
        this.alertService.error(error);
        window.scroll(0, 0);
      });;
      }
      onApproved(purchaseorder,ref) {
        //purchaseorder.purchaseOrderDetails.porcvQty = purchaseorder.purchaseOrderDetails.poQty;
     var data=   purchaseorder.purchaseOrderDetails.filter(e=>
         e.porcvQty==null || e.porcvQty==0
          )
          if(data.length > 0)
          {
            this.alertService.error("Please Input Receive Quantity");
            return
          }
           this.PurchaseorderService.approved(purchaseorder).subscribe(result => {
             this.alertService.success("Success Approved");
             this.getPurchaseorder();
             ref.close();
               window.scroll(0, 0);
           }, error => {
             this.alertService.error(error);
             window.scroll(0, 0);
           });
      }
      printPoData(purchaseorder:Purchaseorder){
        console.log(purchaseorder)
        this.PurchaseorderService.purchaseOrderPrint(purchaseorder).subscribe((data:Blob) => {
          let fileURL = window.URL.createObjectURL(data);
          window.open(fileURL);
          //this.alertService.success("Success Approved");
          this.getPurchaseorder();
          window.location.reload();
          
            window.scroll(0, 0);
        }, error => {
          this.alertService.error(error);
          window.scroll(0, 0);
        });
      }
      private refreshData(): void {    
        this.rerender();    
        this.subscribeToData();        
      }    
      private subscribeToData(): void {    
        this.refreshData();    
      }  
}