import { Component, OnInit, TemplateRef } from '@angular/core';
import { Product } from '../../_models/setup/Product';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { Indentmaster } from '../../_models/indent/indentmaster';
import { Indentservice } from '../../_services/indent/indentservice.service';
import { AlertService } from '../../_services';
import { Subject } from 'rxjs';
import { throwIfAlreadyLoaded } from '../../@core/module-import-guard';

@Component({
  selector: 'ngx-indentapproved',
  templateUrl: './indentapproved.component.html',
  styleUrls: ['./indentapproved.component.scss']
})
export class IndentapprovedComponent implements OnInit {
  indentmasterall: Indentmaster[];

  constructor(private dialogService: NbDialogService,private indentmasterService: Indentservice,private alertService:AlertService) { }
indentall: Product[];
dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject();
  ngOnInit(): void {
    this.getIndentmaster();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
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

      }, error => {
        console.error(error)
        this.alertService.error(error);
        window.scroll(0, 0);
      });;
      }
  
      onApproved(indentmaster,ref) {
        this.indentmasterService.approved(indentmaster).subscribe(result => {
          this.alertService.success("Success Insert");
          this.getIndentmaster();
          ref.close();
            window.scroll(0, 0);
        }, error => {
          this.alertService.error(error);
          window.scroll(0, 0);
        });
   }
   onRejected(requisitionmaster,ref) {
     this.indentmasterService.rejected(requisitionmaster).subscribe(result => {
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
