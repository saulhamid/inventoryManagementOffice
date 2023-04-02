// import { Component } from '@angular/core';

// @Component({
//   selector: 'ngx-ecommerce',
//   templateUrl: './e-commerce.component.html',
// })
// export class ECommerceComponent {
// }

//import { DataTablesModule } from 'angular-datatables';
import { Component, OnInit, TemplateRef } from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { AlertService } from "../../_services";
import { Product } from "../../_models/setup/Product";
//import { Purchaseorder } from '../../_models/purchase/purchaseorder';
import { Purchaseorderservice } from "../../_services/purchase/purchaseorderservice";
import { ProductService } from "../../_services/setup/productService.service";
import { Subject } from "rxjs";


@Component({
  selector: "ngx-ecommerce",
  templateUrl: "./e-commerce.component.html",
  styleUrls: ["./e-commerce.component.scss"],
})
export class ECommerceComponent implements OnInit {
  reorderinglevelall: any;

  constructor(
    private dialogService: NbDialogService,
    private PurchaseorderService: Purchaseorderservice,
    private alertService: AlertService,
    private productService: ProductService
  ) {}
  indentall: Product[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  ngOnInit(): void {
    //this.getPurchaseorder();
    this.getAllReorderingLevel();
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      processing: true,
      destroy: true,
      searching: true,
    };
    this.dtTrigger.next();
  }
  open2(dialog: TemplateRef<any>, date) {
    this.dialogService.open(dialog, { context: date });
  }
  // getPurchaseorder(){
  //   this.reorderinglevelall =[];

  //     this.PurchaseorderService.getAllApproved().subscribe(result => {

  //         console.log(result);
  //         this.reorderinglevelall = result as Purchaseorder[];
  //         this.dtTrigger.next();
  //     }, error => {
  //       console.error(error)
  //       this.alertService.error(error);
  //       window.scroll(0, 0);
  //     });;
  //     }
  // onApproved(purchaseorder,ref) {

  //      this.PurchaseorderService.approvedqc(purchaseorder).subscribe(result => {

  //        this.alertService.success("Success Approved");
  //        //this.getPurchaseorder();
  //        ref.close();
  //          window.scroll(0, 0);
  //      }, error => {

  //        this.alertService.error(error);
  //        window.scroll(0, 0);
  //      });

  // }

  getAllReorderingLevel() {
    this.reorderinglevelall = [];
    this.productService.getAllReorderingLevel().subscribe(
      (result) => {
        console.log(result);
        this.reorderinglevelall = result;

        this.dtTrigger.next();
      },
      (error) => {
        console.error(error);
        //this.alertService.error(error);
        window.scroll(0, 0);
      }
    );
  }
}
