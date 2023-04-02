import { Component, OnInit } from '@angular/core';
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
import { StocktransferService } from '../../_services/stock/stocktransfer.service';

@Component({
  selector: 'ngx-stocklist',
  templateUrl: './stocklist.component.html',
  styleUrls: ['./stocklist.component.scss']
})
export class StocklistComponent implements OnInit {
  productnamelist: string[];
  productall: Product[];
  constructor(  private productService: ProductService,private alertService:AlertService,  private uomService: UOMService,
    private category:CategoryService,private subcategoryService: SubcategoryService,private supplierService:SupplierService,private stocktransferService: StocktransferService) { }
  submitted = false;
  stockall  : Stock[];
  stock : Stock;
  stockfilter : Stock;
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
    this.getProduct();
    this.getcategory();
    this.getsubcategory();
    this.getuom();
    this.getSupplier();
    this.getStock();
    this.stockfilter=new Stock;
    this.filteredNgModelOptions$ = of(this.productnamelist);
    this.reportType=['ProductWise','CategoryWise','SubCategoryWise','SupplierWise'];
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10,
    processing: true
  };
  this.stockfilter.rptType='ProductWise';
  }
onSelect(categoryID) {
  this.subcategoryallfilter=[];
  this.subcategoryallfilter=this.subcategoryall.filter((item) => item.categoryId == categoryID);
  this.subcate=true;
}
getStock(){
   
    this.stocktransferService.getSelectAllStockByBranch(12).subscribe(result => {
       
        console.log(result);
        this.stockall = result as Stock[];

    }, error => {
      console.error(error)
      this.alertService.error(error);
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
            // this.dtTrigger.next();
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
}
