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
// import { designationService } from '../../_services/setup/designationService.service';
// import { designationVM } from '../../_models/designationVM';

@Component({
  selector: 'ngx-requisitionapprovedthird',
  templateUrl: './requisitionapprovedthird.component.html',
  styleUrls: ['./requisitionapprovedthird.component.scss']
})
export class RequisitionapprovedthirdComponent implements OnInit {
  requisitionmasterall: Requisitionmaster[];
  RequisitionDetails: RequisitionDetail;
  // employeeAllSelected : any[];
  // designationEmpNameall  : designationVM[];


  constructor(private dialogService: NbDialogService,private requisitionmasterService: Requisitionservice, private alertService:AlertService) { }
requisitionall: Product[];
dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject();
remarks:string;
  ngOnInit(): void {
    this.getrequisitionmaster();
    // this.getDesination();
    this.remarks = '';
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }
  open2(dialog: TemplateRef<any>,date) {
    this.remarks = date.remarks
    this.dialogService.open(
      dialog,
      { context: date });
  }
  getrequisitionmaster(){
      this.requisitionmasterService.getAllForThirdApporove().subscribe(result => {
          console.log(result);
          debugger;
          this.requisitionmasterall = result as Requisitionmaster[];
          
      }, error => {
        console.error(error)
    //    this.alertService.error(error);
        window.scroll(0, 0);
      });;
      }
      onApproved(requisitionmaster,ref) {
        debugger;
    
        //requisitionmaster.employees = this.employeeAllSelected;
        requisitionmaster.remarks = this.remarks;
        
        this.alertService.confirmation().onClose.subscribe(name => {
          if(name==true){
            this.requisitionmasterService.RequisitionApprovePartThreeCreatePdf(requisitionmaster).subscribe((data:Blob) => {
              this.alertService.success("Success Insert");
              let fileURL = window.URL.createObjectURL(data);
              window.open(fileURL);
               this.getrequisitionmaster();
               ref.close();
                 window.scroll(0, 0);
             }, error => {
               this.alertService.error(error);
               window.scroll(0, 0);
             });
          }
        })
     
           
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

  //  onSelect(designationId){
  //   debugger;
  //   this.employeeAllSelected=designationId
    
    
  // }
  //  getDesination(){
  //   this.designationService.getEmpnameWithDesignation().subscribe(result => {
  //      debugger;
  //       console.log(result);
  //       this.designationEmpNameall = result as designationVM[];
  //       //this.dtTrigger.next();
  //   }, error => {
  //     console.error(error)
  //     this.alertService.error("Data Not Found");
  //     window.scroll(0, 0);
  //   });
  
    
  //   }
   
      btnDelete(requisitionDetails:RequisitionDetail,requisitionDetailslist: RequisitionDetail[]){
        requisitionDetailslist=  requisitionDetailslist.filter(e=>e.requisitionId != requisitionDetails.productId);
      }
}
