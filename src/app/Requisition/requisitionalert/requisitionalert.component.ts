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
  selector: 'ngx-requisitionalert',
  templateUrl: './requisitionalert.component.html',
  styleUrls: ['./requisitionalert.component.scss']
})
export class RequisitionalertComponent implements OnInit {
  requisitionmasterall: Requisitionmaster[];
  getAllRequisitionAlertList : any;
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
      this.requisitionmasterService.getAllRequisitionAlert().subscribe(result => {
          //console.log(result);
          this.getAllRequisitionAlertList = result ;
          console.log(this.getAllRequisitionAlertList);
      }, error => {
        console.error(error)
       // this.alertService.error(error);
        window.scroll(0, 0);
      });;
      }

      onApprovedFromBranch(requisitionAlert,ref){
        this.requisitionmasterService.approveRequisitionAlertFromBranch(requisitionAlert).subscribe(result => {
          this.alertService.success("Success Insert");
          this.getrequisitionmaster();
          ref.close();
            window.scroll(0, 0);
        }, error => {
          this.alertService.error(error);
          window.scroll(0, 0);
        });
      }

      onApproved(requisitionAlert,ref) {

        debugger;

           this.requisitionmasterService.approveRequisitionAlert(requisitionAlert).subscribe(result => {
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
        // this.requisitionmasterService.rejected(requisitionmaster).subscribe(result => {
        //   this.alertService.success("Success Insert");
        //   this.getrequisitionmaster();
        //   ref.close();
        //     window.scroll(0, 0);
        // }, error => {
        //   this.alertService.error(error);
        //   window.scroll(0, 0);
        // });
   }
   
      btnDelete(requisitionDetails:RequisitionDetail,requisitionDetailslist: RequisitionDetail[]){
        requisitionDetailslist=  requisitionDetailslist.filter(e=>e.requisitionId != requisitionDetails.productId);
      }
}
