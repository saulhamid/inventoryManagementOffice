import { Component, OnInit, TemplateRef } from '@angular/core';
import { Product } from '../../_models/setup/Product';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { Requisitionservice } from '../../_services/requisition/requisitionservice.service';
import { AlertService } from '../../_services';
import { Subject } from 'rxjs';
import { throwIfAlreadyLoaded } from '../../@core/module-import-guard';
import { Requisitionmaster } from '../../_models/requisition/requisitionmaster';
import { RequisitionDetail } from '../../_models/requisition/RequisitionDetail';
import { EWOULDBLOCK } from 'constants';
import { StocktransferService } from '../../_services/stock/stocktransfer.service';
import { Stocktransfer } from '../../_models/stock/stocktransfer';
import { StockTransferDetails } from '../../_models/stock/stocktransferdetail';

@Component({
  selector: 'ngx-stocktransferreceive',
  templateUrl: './stocktransferreceive.component.html',
  styleUrls: ['./stocktransferreceive.component.scss']
})
export class stocktransferreceiveComponent implements OnInit {
  stocktransfereall: Stocktransfer[];
  stocktransferDetails: StockTransferDetails;

  constructor(private dialogService: NbDialogService,private stocktransferService: StocktransferService,private alertService:AlertService) { }
requisitionall: Product[];
dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject();
  ngOnInit(): void {
    this.getstocktransfer();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }
  open2(dialog: TemplateRef<any>,date) {
    this.dialogService.open(
      dialog,
      { context: date });
  }
  getstocktransfer(){
      this.stocktransferService.getSelectAllForReceive().subscribe(result => {
          console.log(result);
          this.stocktransfereall = result as Stocktransfer[];
      }, error => {
        console.error(error)
        this.alertService.error(error);
        window.scroll(0, 0);
      });;
      }
      onreceive(requisitionmaster,ref) {
        debugger
           this.stocktransferService.received(requisitionmaster).subscribe(result => {
             this.alertService.success("Success Insert");
             this.getstocktransfer();
             ref.close();
               window.scroll(0, 0);
           }, error => {
             this.alertService.error(error);
             window.scroll(0, 0);
           });
      }
      onRejected(requisitionmaster,ref) {
        this.stocktransferService.rejected(requisitionmaster).subscribe(result => {
          this.alertService.success("Success Insert");
          this.getstocktransfer();
          ref.close();
            window.scroll(0, 0);
        }, error => {
          this.alertService.error(error);
          window.scroll(0, 0);
        });
   }
   
      btnDelete(requisitionDetails:RequisitionDetail,requisitionDetailslist: RequisitionDetail[]){
        requisitionDetailslist=  requisitionDetailslist.filter(e=>e.requisitionId != requisitionDetails.productId);
      }
}
