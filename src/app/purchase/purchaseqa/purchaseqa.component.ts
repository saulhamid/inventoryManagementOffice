import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { AlertService } from '../../_services';
import { Product } from '../../_models/setup/Product';
import { Purchaseorder } from '../../_models/purchase/purchaseorder';
import { Purchaseorderservice } from '../../_services/purchase/purchaseorderservice';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-purchaseqa',
  templateUrl: './purchaseqa.component.html',
  styleUrls: ['./purchaseqa.component.scss']
})
export class PurchaseqaComponent implements OnInit {

  purchaseorderall: Purchaseorder[];

  constructor(private dialogService: NbDialogService,private PurchaseorderService: Purchaseorderservice,private alertService:AlertService) { }
indentall: Product[];
dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject();
  ngOnInit(): void {
    this.getPurchaseorder();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
  }
  open2(dialog: TemplateRef<any>,date) {
    this.dialogService.open(
      dialog,
      { context: date });
  }
  getPurchaseorder(){
    this.purchaseorderall =[];
     
      this.PurchaseorderService.getAllApproved().subscribe(result => {
         
          console.log(result);
          this.purchaseorderall = result as Purchaseorder[];
          this.dtTrigger.next();
      }, error => {
        console.error(error)
        this.alertService.error(error);
        window.scroll(0, 0);
      });;
      }
      onApproved(purchaseorder,ref) {
         
           this.PurchaseorderService.approvedqc(purchaseorder).subscribe(result => {
              
             this.alertService.success("Success Approved");
             this.getPurchaseorder();
             ref.close();
               window.scroll(0, 0);
           }, error => {
              
             this.alertService.error(error);
             window.scroll(0, 0);
           });
   
      }
    }
