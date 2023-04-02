import { Component, OnInit, TemplateRef } from '@angular/core';
import { Indentmaster } from '../../_models/indent/indentmaster';
import { NbDialogService } from '@nebular/theme';
import { Indentservice } from '../../_services/indent/indentservice.service';
import { Subject } from 'rxjs';
import { Product } from '../../_models/setup/Product';
import { AlertService } from '../../_services';

@Component({
  selector: 'ngx-procurmentapprove',
  templateUrl: './procurmentapprove.component.html',
  styleUrls: ['./procurmentapprove.component.scss']
})
export class ProcurmentapproveComponent implements OnInit {

  indentmasterall: Indentmaster[];

  constructor(private dialogService: NbDialogService,private indentmasterService: Indentservice,private alertService:AlertService) { }
indentall: Product[];
dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject();
  ngOnInit(): void {
    this.getIndentmaster();
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
  getIndentmaster(){
     
      this.indentmasterService.getAllapprved().subscribe(result => {
         
          console.log(result);
          this.indentmasterall = result as Indentmaster[];
          this.dtTrigger.next();
      }, error => {
        console.error(error)
        this.alertService.error(error);
        window.scroll(0, 0);
      });;
      }
      onApproved(indentmaster,ref) {
         
     
           this.indentmasterService.approvedprocurment(indentmaster).subscribe(result => {
              
             this.alertService.success("Success Insert");
             this.getIndentmaster();
             ref.close();
               window.scroll(0, 0);
           }, error => {
              
             this.alertService.error(error);
             window.scroll(0, 0);
           });
   
      }

}
