import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../_services';
import { CompanyService } from '../../_services/setup/companyservice.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SupplierProduct } from '../../_models/setup/supplierproduct';
import { SupplierProductService } from '../../_services/setup/SupplierProductService.service';
import { Product } from '../../_models/setup/Product';
import { Supplier } from '../../_models/setup/Supplier';
import { SupplierService } from '../../_services/setup/supplierService.service';
import { ProductService } from '../../_services/setup/productService.service';
import { Category } from '../../_models/setup/category';
import { CategoryService } from '../../_services/setup/categoryService.service';
import { SubcategoryService } from '../../_services/setup/subcategoryService.service';
import { Subcategory } from '../../_models/setup/subcategory';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-supplierproduct',
  templateUrl: './supplierproduct.component.html',
  styleUrls: ['./supplierproduct.component.scss']
})
export class SupplierproductComponent implements OnInit {
  categoryall: Category[];
  subcategoryall: Subcategory[];
  subcategoryallfilter: Subcategory[];
  productallfilter: Product[];
  productsuplist: Product[];
  productsupfinallist: Product[];
  supplierId: string;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(  private supplierProductService: SupplierProductService,private alertService:AlertService,  
    private supplierService: SupplierService,private productService: ProductService,private formBuilder: FormBuilder,
    private category:CategoryService,private subcategoryService: SubcategoryService) { }
    registerForm: FormGroup;
  submitted = false;
  supplierProductall  : SupplierProduct[];
  supplierProductsave  : SupplierProduct[];
  SupplierProduct : SupplierProduct;
  listshow=true;
  productall  : Product[];
  supplierall  : Supplier[];
  ngOnInit() {
    this.listshow=true
    this.getSupplierProduct();
    this.getcategory();
    this.getsupplier();
    this.getsubcategory();
    this.getproduct();
    this.registerForm = this.formBuilder.group({
      supplierid: ['', Validators.required],
      productid: ['', Validators.required],
      cpu: ['', Validators.required]
  });
  this.registerForm.controls['supplierid'].patchValue("0");
  this.registerForm.controls['productid'].patchValue("0");
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10,
    processing: true
  };
  }
   // convenience getter for easy access to form fields
   get f() { return this.registerForm.controls; }

   onSave() {
      
       this.submitted = true;
       this.supplierProductsave=[];

       // stop here if form is invalid
     this.productsupfinallist.forEach(e => {
      this.SupplierProduct=new SupplierProduct;
       this.SupplierProduct.productId=e.productId;
       this.SupplierProduct.supplierId=this.supplierId;
       this.SupplierProduct.cpu=e.cpu;
       this.supplierProductsave.push(this.SupplierProduct)
     })
       if(this.supplierProductsave){
        this.supplierProductService.Create(this.supplierProductsave).subscribe(result => {
           
          this.alertService.success("Success Insert");
          this.getSupplierProduct();
          this.onReset();
          this.listshow=true;
            window.scroll(0, 0);
        }, error => {
           
          this.alertService.error(error);
          window.scroll(0, 0);
        });
      }
   }
btnadd(){
  this.listshow=false;
}
btnEdit(supplierProduct:SupplierProduct ){
   
  this.SupplierProduct=supplierProduct;
  this.listshow=false;
  this.listshow=false;
}
btnDelete(supplierProduct:SupplierProduct ){
  this.SupplierProduct=supplierProduct;
  this.supplierProductService.delete(this.registerForm.value).subscribe(result => {
    this.alertService.success("Success Delete");
    this.getSupplierProduct();
    this.listshow=true;
    this.onReset();
      window.scroll(0, 0);
  }, error => {
     
    this.alertService.error(error);
    window.scroll(0, 0);
  });
}
onSelectSupply(ID) {
  this.supplierall.filter((item) => item.id == ID).map(e=>this.supplierId= ID)
}
onSelect(categoryID) {
  this.subcategoryallfilter=[];
  categoryID.forEach(e => {
    if(this.subcategoryall.filter((item) => item.categoryId == e).length != 0){
   this.subcategoryallfilter.push(this.subcategoryall.filter((item) => item.categoryId == e)[0]);
    }
  });
}
onSelectCategory(categoryID) {
  this.productallfilter=[];
   ;
  categoryID.forEach(e => {
    if(this.productall.filter((item) => item.subCategoryId == e).length != 0){
      this.productall.filter((item) => item.subCategoryId == e).forEach(a=>{
        this.productallfilter.push(a);
      });
  }});
}
onSelectProduct(categoryID) {
  this.productsuplist=[];
  categoryID.forEach(e => {
    if(this.productallfilter.filter((item) => item.productId == e).length != 0){
     this.productsuplist.push(this.productall.filter((item) => item.productId == e)[0]);
    }
  });
}
addfunProductSup(){
  debugger
this.productsuplist.forEach(e => {
  e.subcategoryName=this.subcategoryall.filter((item) => item.id == e.subCategoryId).map(e=>e.name).toString();
  e.categoryName=this.categoryall.filter((item) => item.id == e.categoryID).map(e=>e.name).toString();
  e.supplyName=this.supplierall.filter((item)=>item.id ==this.supplierId ).map(e=>e.supplierName).toString();
})  

this.productsupfinallist=this.productsuplist;
}
getSupplierProduct(){
   
    this.supplierProductService.getAll().subscribe(result => {
       
        console.log(result);
        this.supplierProductall = result as SupplierProduct[];
        this.dtTrigger.next();
    }, error => {
      console.error(error)
      this.alertService.error(error);
      window.scroll(0, 0);
    });;
    }



    getsupplier(){
       
        this.supplierService.getAll().subscribe(result => {
           
            console.log(result);
            this.supplierall = result as Supplier[];
        }, error => {
          console.error(error)
          this.alertService.error(error);
          window.scroll(0, 0);
        });;
        }
        getproduct(){
           
            this.productService.getAll().subscribe(result => {
               
                console.log(result);
                this.productall = result as Product[];
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
    onReset() {
      this.submitted = false;
      this.registerForm.reset();
      this.listshow=true
  }
}
