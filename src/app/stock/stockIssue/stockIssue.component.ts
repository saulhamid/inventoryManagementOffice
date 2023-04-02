import { Component, OnInit, Optional, TemplateRef } from '@angular/core';
import { ProductService } from '../../_services/setup/productService.service';
import { AlertService } from '../../_services';
import { UOMService } from '../../_services/setup/uomService.service';
import { CategoryService } from '../../_services/setup/categoryService.service';
import { SubcategoryService } from '../../_services/setup/subcategoryService.service';
import { Product } from '../../_models/setup/Product';
import { UOM } from '../../_models/setup/UOM';
import { Category } from '../../_models/setup/category';
import { Subcategory } from '../../_models/setup/subcategory';
import { Subject, Observable, of } from 'rxjs';
import { Stock } from '../../_models/stock/stock';
import { Supplier } from '../../_models/setup/Supplier';
import { SupplierService } from '../../_services/setup/supplierService.service';
import { Requisitionservice } from '../../_services/requisition/requisitionservice.service';
import { StockissueService } from '../../_services/stock/stockissue.service';
import { Requisitionmaster } from '../../_models/requisition/requisitionmaster';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Stockissue } from '../../_models/stock/stockissue';

@Component({
  selector: 'ngx-stockIssue',
  templateUrl: './stockIssue.component.html',
  styleUrls: ['./stockIssue.component.scss']
})
export class StockIssueComponent implements OnInit {
  productnamelist: string[];
  productall: Product[];
  constructor(  private productService: ProductService,private alertService:AlertService,  private uomService: UOMService,
    private category:CategoryService,private subcategoryService: SubcategoryService,private supplierService:SupplierService,private requisitionservice:Requisitionservice,
    private stockissueService:StockissueService,
    private dialogService: NbDialogService,@Optional() private ref: NbDialogRef<StockIssueComponent>) { }
  submitted = false;
  stockall  : Stock[];
  Stockissueall  : Stockissue[];
  Stockissue  : Stockissue;
  RequisitionAll:Requisitionmaster[];
  stock : Stock;
  stockfilter : any;
  listshow=true;
  subcate=false;
  uomall  : UOM[];
  categoryall  : Category[];
  subcategoryall  : Subcategory[];
  subcategoryallfilter  : Subcategory[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  supplierall : Supplier[];
  filteredNgModelOptions$: Observable<string[]>;
  reportType:string[];
  ngOnInit() {
    this.listshow=true
    this.subcate=false;
    this.getRequestionDetail();
    this.getRequestionAll();
    this.getProduct();
    this.getcategory();
    this.getsubcategory();
    this.getuom();
    this.getSupplier();
    this.stockfilter=new Stock;
    this.filteredNgModelOptions$ = of(this.productnamelist);
    this.reportType=['ProductWise','CategoryWise','SubCategoryWise','SupplierWise'];
    this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    processing: true,

  };
  this.stockfilter.rptType='ProductWise';
  }
  open2(dialog: TemplateRef<any>,date) {
    this.dialogService.open(
      dialog,
      { context: date 
      });
  }
onSelect(categoryID) {
  this.subcategoryallfilter=[];
  this.subcategoryallfilter=this.subcategoryall.filter((item) => item.categoryId == categoryID);
  this.subcate=true;
}
getRequestionDetail(){
    this.requisitionservice.getRequestionDetail().subscribe(result => {
        console.log(result);
        this.Stockissueall = result as Stockissue[];
    }, error => {
      console.error(error)
      window.scroll(0, 0);
    });;
    }
    getRequestionAll(){
      this.requisitionservice.getAll().subscribe(result => {
          console.log(result);
          this.RequisitionAll = result as Requisitionmaster[];
      }, error => {
        console.error(error)
        window.scroll(0, 0);
      });;
      }
getStock(){
   
    this.productService.getAll().subscribe(result => {
       
        console.log(result);
        this.stockall = result as Stock[];
    }, error => {
      console.error(error)
      window.scroll(0, 0);
    });;
    }
getProduct(){
   
    this.productService.getAll().subscribe(result => {
       
        console.log(result);
        this.productall = result as Product[];
        this.productnamelist=this.productall.map(e=>e.productName);
      
    }, error => {
      console.error(error)
      this.alertService.error(error);
      window.scroll(0, 0);
    });;
    }
    filtersubmit(){
       
      this.stockfilter.productName=this.stockfilter.productName == null ? '':this.stockfilter.productName.toString();
      this.stockfilter.categoryID=this.stockfilter.categoryID == null ? '':this.stockfilter.categoryID.toString();
      this.stockfilter.uomId=this.stockfilter.uomId == null ? '':this.stockfilter.uomId.toString();
      this.stockfilter.subCategoryId= this.stockfilter.subCategoryId == null ? '': this.stockfilter.subCategoryId.toString();
      this.stockfilter.supId= this.stockfilter.supId == null ? '': this.stockfilter.supId.toString();
      this.stockall=null;
      var date= this.stockfilter.expireDate == null ? '' : this.stockfilter.expireDate.toLocaleDateString();
        this.productService.getAllStockFilter(this.stockfilter.productName, this.stockfilter.categoryID,this.stockfilter.subCategoryId,this.stockfilter.uomId,date).subscribe(result => {
           
            console.log(result);
            this.stockall = result as Stock[];
            this.productnamelist=this.productall.map(e=>e.productName);
            this.dtTrigger.next();
        }, error => {
          console.error(error)
          this.alertService.error(error);
          window.scroll(0, 0);
        });;
        }
    getcategory(){
       
        this.category.getAll().subscribe(result => {
           
            console.log(result);
            this.categoryall = result as Category[];
        }, error => {
          console.error(error)
          this.alertService.error(error);
          window.scroll(0, 0);
        });;
        }
        getsubcategory(){
           
            this.subcategoryService.getAll().subscribe(result => {
               
                console.log(result);
                this.subcategoryall = result as Subcategory[];
            }, error => {
              console.error(error)
              this.alertService.error(error);
              window.scroll(0, 0);
            });;
            }
            getuom(){
                this.uomService.getAll().subscribe(result => {
                    console.log(result);
                    this.uomall = result as UOM[];
                }, error => {
                  console.error(error)
                  this.alertService.error(error);
                  window.scroll(0, 0);
                });;
                }
                getSupplier(){
                    this.supplierService.getAll().subscribe(result => {
                        console.log(result);
                        this.supplierall = result as Supplier[];
                        this.dtTrigger.next();
                    }, error => {
                      console.error(error)
                      this.alertService.error(error);
                      window.scroll(0, 0);
                    });;
                    }
                   
                    IssueSave(stockissue:Stockissue){
                      stockissue.qty=stockissue.rQty;
                      stockissue.requisitionDetailId=stockissue.requisitionDetailId;
                      
                      this.productService.StockIssue(stockissue).subscribe(result => {
                        this.alertService.success("Success Issue Product");
                        this.ref.close()
                        this.onReset();
                        this.listshow=true;
                       
                        this.getRequestionDetail();
                          window.scroll(0, 0);
                      }, error => {
                        this.alertService.error(error);
                        window.scroll(0, 0);
                      });
                      this.ref.close();
                    }
            
    onReset() {
      this.getProduct();
      this.submitted = false;
      this.listshow=true
      this.subcate=false;
  }
  opeonrpt(){
     
    this.stockfilter.productName=this.stockfilter.productName == null ? '':this.stockfilter.productName.toString();
    this.stockfilter.categoryID=this.stockfilter.categoryID == null ? '':this.stockfilter.categoryID.toString();
    this.stockfilter.uomId=this.stockfilter.uomId == null ? '':this.stockfilter.uomId.toString();
    this.stockfilter.subCategoryId= this.stockfilter.subCategoryId == null ? '': this.stockfilter.subCategoryId.toString();
    var date= this.stockfilter.expireDate == null ? '' : this.stockfilter.expireDate.toLocaleDateString();
    this.productService.StockPdf(this.stockfilter.productName, this.stockfilter.categoryID,this.stockfilter.subCategoryId,this.stockfilter.rptType).subscribe((data: Blob) => {
      let fileURL = window.URL.createObjectURL(data);
      window.open(fileURL);
  });
  }
  private filter(value: string): string[] {
    const filterValue = value;
    var data=this.productnamelist.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
    return data;
  }
  onModelChange(value: string) {
    this.filteredNgModelOptions$ = of(this.filter(value));
  }
  onResetfilter(){
    
  }
  StockIssueForEmployee(Stockissue: Stockissue){
    this.alertService.confirmation().onClose.subscribe(name => {
      if(name==true){
        debugger
       var data={ProductId:Stockissue.productId,}
        this.stockissueService.Create(Stockissue).subscribe(result => {
          this.alertService.success("Stock Issue Successfull");
          this.getRequestionAll();
            window.scroll(0, 0);
        }, error => {
         
          window.scroll(0, 0);
        });
      }})

  }
}
