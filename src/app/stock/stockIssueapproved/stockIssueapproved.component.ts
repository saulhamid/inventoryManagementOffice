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

@Component({
  selector: 'ngx-stockIssueapproved',
  templateUrl: './stockIssueapproved.component.html',
  styleUrls: ['./stockIssueapproved.component.scss']
})
export class StockIssueapprovedComponent implements OnInit {
  requisitionmasterall: Requisitionmaster[];
  RequisitionDetails: RequisitionDetail;

  constructor(private dialogService: NbDialogService,private requisitionmasterService: Requisitionservice,private alertService:AlertService) { }
requisitionall: Product[];
dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject();
  ngOnInit(): void {
    this.getrequisitionmaster();
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
  getrequisitionmaster(){
      this.requisitionmasterService.getAllapprved().subscribe(result => {
          console.log(result);
          this.requisitionmasterall = result as Requisitionmaster[];
          
      }, error => {
        console.error(error)
        this.alertService.error(error);
        window.scroll(0, 0);
      });;
      }
      onApproved(requisitionmaster,ref) {
           this.requisitionmasterService.approved(requisitionmaster).subscribe(result => {
             this.alertService.success("Success Insert");
             this.getrequisitionmaster();
             ref.close();
               window.scroll(0, 0);
           }, error => {
             this.alertService.error(error);
             window.scroll(0, 0);
           });
      }
      onRejected(requisitionmaster,ref) {
        this.requisitionmasterService.rejected(requisitionmaster).subscribe(result => {
          this.alertService.success("Success Insert");
          this.getrequisitionmaster();
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
