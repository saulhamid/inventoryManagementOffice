import { Component, OnInit, ViewChild } from '@angular/core';
import { Purchaseorder } from '../../_models/purchase/purchaseorder';
import { Supplier } from '../../_models/setup/Supplier';
import { Subject, of, Observable } from 'rxjs';
import { Purchaseorderservice } from '../../_services/purchase/purchaseorderservice';
import { AlertService } from '../../_services';
import { SupplierService } from '../../_services/setup/supplierService.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'ngx-pureport',
  templateUrl: './pureport.component.html',
  styleUrls: ['./pureport.component.scss']
})
export class PureportComponent implements OnInit {
  Purchaseorderall: Purchaseorder[];
  purchasefilter:Purchaseorder;
  supplierall: Supplier[];
  constructor(private purchaseorderService: Purchaseorderservice,private alertService:AlertService,private supplierService:SupplierService) { }
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, {static: false})
dtElement: DataTableDirective;
filteredNgModelOptions$: Observable<string[]>;
reportType: string[];
isDtInitialized:boolean = false;
statuses = Array<{id: number, text: string}>();
  ngOnInit(): void {
    this.getPurchase();
    this.getSupplier();
    this.purchasefilter=new Purchaseorder;
    this.purchasefilter.pODate=new Date();
    this.purchasefilter.supId='0';
    this.reportType=['DateWise','SupplierWise'];
    this.purchasefilter.rptType='DateWise';
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.statuses = [
      {id: 1, text: 'Not Approved'},
      {id: 2, text: 'Approved'}
  ];
  }
  getPurchase(){
     
      this.purchaseorderService.getAllpurchase().subscribe(result => {
         
          console.log(result);
          this.Purchaseorderall = result as Purchaseorder[];
          if (this.isDtInitialized) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next();
            });
        } else {
            this.isDtInitialized = true;
            this.dtTrigger.next();
        }
      }, error => {
        console.error(error)
        this.alertService.error(error);
        window.scroll(0, 0);
      });;
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
          }, error => {
            console.error(error)
            this.alertService.error(error);
            window.scroll(0, 0);
          });;
          }
          private filter(value: string) :string[] {
            const filterValue = value;
            var data=this.Purchaseorderall.filter(optionValue => optionValue.invoice.toLowerCase().includes(filterValue)).map(e=> e.invoice);
            return data;
          }
          onModelChange(value: string) {
            this.filteredNgModelOptions$ = of(this.filter(value));
          }
          opeonrpt(Id:string ){
            this.purchaseorderService.downloadPurchaseInvoice(Id).subscribe((data: Blob) => {
              let fileURL = window.URL.createObjectURL(data);
              window.open(fileURL);
          });
          }
          opeonListrpt(){
             ;
            this.purchasefilter.status=this.purchasefilter.status == null ? '':this.purchasefilter.status.toString();
            this.purchasefilter.supId=this.purchasefilter.supId == null ? '':this.purchasefilter.supId.toString();
            this.purchasefilter.startDate=this.convert(this.purchasefilter.startDate);
            this.purchasefilter.endDate=this.convert(this.purchasefilter.endDate);
            this.purchaseorderService.downloadPdfList(this.purchasefilter.status,this.purchasefilter.supId,this.purchasefilter.startDate,this.purchasefilter.endDate,this.purchasefilter.rptType).subscribe((data: Blob) => {
              let fileURL = window.URL.createObjectURL(data);
              window.open(fileURL);
          });
          }
          convert(str) {
            var date = new Date(str),
              mnth = ("0" + (date.getMonth() + 1)).slice(-2),
              day = ("0" + date.getDate()).slice(-2);
            return [date.getFullYear(), mnth, day].join("-");
          }
}
