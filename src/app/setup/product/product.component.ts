import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_services/setup/productService.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from '../../_services';
import { Product } from '../../_models/setup/Product';
import { UOM } from '../../_models/setup/UOM';
import { Category } from '../../_models/setup/category';
import { Subcategory } from '../../_models/setup/subcategory';
import { UOMService } from '../../_services/setup/uomService.service';
import { CategoryService } from '../../_services/setup/categoryService.service';
import { SubcategoryService } from '../../_services/setup/subcategoryService.service';
import { Subject, Observable, of } from 'rxjs';
import { data } from 'jquery';
import { DomSanitizer } from '@angular/platform-browser';
import { BranchService } from '../../_services/setup/branchService.service';
import { Branch } from '../../_models/setup/Branch';
import { CompanyService } from '../../_services/setup/companyservice.service';
import { Company } from '../../_models/setup/company';

@Component({
  selector: 'ngx-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productnamelist: string[];
  selectedFile: File;
  image: any;
  subfilter: Subcategory[];
  constructor(private productService: ProductService, private alertService: AlertService, private uomService: UOMService,
    private formBuilder: FormBuilder, private sanitizer: DomSanitizer, private category: CategoryService, private subcategoryService: SubcategoryService,
    private branchService: BranchService,private companyService:CompanyService) { }
  registerForm: FormGroup;
  submitted = false;
  productall: Product[];
  product: Product;
  productfilter: Product;
  listshow = true;
  subcate = false;
  Isopening = false;
  uomall: UOM[];
  categoryall: Category[];
  subcategoryall: Subcategory[];
  subcategoryallfilter: Subcategory[];
  branchall: Branch[];
  companyall:Company[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  filteredNgModelOptions$: Observable<string[]>;

  FrombranchCompany:Branch[];
  FromSubbranchCompany:Branch[];

  ngOnInit() {
    this.listshow = true
    this.subcate = false;
    this.getProduct();
    this.getcategory();
    this.getsubcategory();
    this.getuom();
    this.getcompany();
    this.getBranch(0);
    this.productfilter = new Product;
    this.filteredNgModelOptions$ = of(this.productnamelist);
    this.registerForm = this.formBuilder.group({
      productName: ['', Validators.required],
      categoryId: ['', Validators.required],
      subcategoryId: ['', Validators.required],
      productDescription: [],
      // productDescription2: [''],
      UOMId: ['', Validators.required],
      expireDate: [''],
      minOrder: [''],
      maxOrder: [''],
      reOrderlevel: [''],
      cpu: [''],
      RPU: [''],
      openingStock: [''],
      companyNameId:[''],
      OpenbranchId:['',Validators.required],
      boxSize:[''],
      boxQuantity:[''],
      purchaseUOMId:[''],
      conversionRate:[''],
      Url:[''],
    });
    this.registerForm.controls['categoryId'].patchValue("");
    this.registerForm.controls['companyNameId'].patchValue("");
    this.registerForm.controls['UOMId'].patchValue("");
    this.registerForm.controls['OpenbranchId'].patchValue("");
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      processing: true
    };
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  onSubmit() {
    debugger;
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('productName', this.registerForm.controls["productName"].value);
    formData.append('categoryId', this.registerForm.controls["categoryId"].value);
    formData.append('subcategoryId', this.registerForm.controls["subcategoryId"].value);
    formData.append('UOMId', this.registerForm.controls["UOMId"].value);
    formData.append('purchaseUOMId', this.registerForm.controls["purchaseUOMId"].value);
    formData.append('conversionRate', this.registerForm.controls["conversionRate"].value);
    //formData.append('ProductDescription', this.registerForm.controls["ProductDescription"].value);
    formData.append('expireDate', this.convert(this.registerForm.controls["expireDate"].value));
    formData.append('minOrder', '0');
    //formData.append('minOrder', this.registerForm.controls["minOrder"].value);
    formData.append('maxOrder', this.registerForm.controls["maxOrder"].value);
    formData.append('reOrderlevel', this.registerForm.controls["reOrderlevel"].value);
    formData.append('cpu', this.registerForm.controls["cpu"].value);
    formData.append('openingStock', this.registerForm.controls["openingStock"].value);
    formData.append('OpenbranchId', this.registerForm.controls["OpenbranchId"].value);
    formData.append('boxSize', this.registerForm.controls["boxSize"].value);
    formData.append('boxQuantity', this.registerForm.controls["boxQuantity"].value);
    formData.append('RPU', '0');
    formData.append('Image', this.selectedFile);
    if (!this.product) {
      this.productService.Create(formData).subscribe(result => {

        this.alertService.success("Success Insert");
        this.getProduct();
        this.onReset();
        this.listshow = true;
        window.scroll(0, 0);
      }, error => {

        this.alertService.error(error);
        window.scroll(0, 0);
      });
    } else {
      formData.append('productId', this.registerForm.controls["productId"].value);
      this.productService.udate(formData).subscribe(result => {

        this.alertService.success("Success Update");
        this.getProduct();
        this.onReset();
        window.scroll(0, 0);
      }, error => {

        this.alertService.error(error);
        window.scroll(0, 0);
      });
    }
  }
  btnadd() {
    this.listshow = false;
    this.registerForm.reset();
    this.image = null;
    this.registerForm.controls['categoryId'].patchValue("");
    this.registerForm.controls['UOMId'].patchValue("");
    this.registerForm.controls['subcategoryId'].patchValue("");
    this.registerForm.controls['companyNameId'].patchValue("0");
    this.registerForm.controls['boxSize'].patchValue("0");
    this.registerForm.controls['boxQuantity'].patchValue("0");
    this.registerForm.controls['OpenbranchId'].patchValue("");
  }
  btnEdit(product: Product) {
    this.product = product;
    console.log(this.product);
    this.listshow = false;
    this.subcategoryallfilter = this.subcategoryall.filter((item) => item.categoryId == product.categoryID);
    this.subcate = true;
    this.registerForm.addControl('productId', new FormControl('', Validators.required));
    this.registerForm.controls['productId'].patchValue(product.productId);
    this.registerForm.controls['productName'].patchValue(product.productName);
    this.registerForm.controls['categoryId'].patchValue(product.categoryID);
    this.registerForm.controls['subcategoryId'].patchValue(product.subCategoryId);
    this.registerForm.controls['productDescription'].patchValue(product.productDescription);
    this.registerForm.controls['UOMId'].patchValue(product.uomId);
    this.registerForm.controls['expireDate'].patchValue(null);
    this.registerForm.controls['minOrder'].patchValue(product.minOrder);
    this.registerForm.controls['maxOrder'].patchValue(product.maxOrder);
    this.registerForm.controls['reOrderlevel'].patchValue(product.reOrderlevel);
    this.registerForm.controls['cpu'].patchValue(product.cpu);
    this.registerForm.controls['openingStock'].patchValue(product.openingStock);
    this.registerForm.controls['RPU'].patchValue(0);
    this.registerForm.controls['boxSize'].patchValue(product.boxSize);
    this.registerForm.controls['boxQuantity'].patchValue(product.boxQuantity);
    this.registerForm.controls['OpenbranchId'].patchValue(product.branchIdOpening);
    this.registerForm.controls['purchaseUOMId'].patchValue(product.purchaseUOMId);
    let objectURL = 'data:image/png;base64,' + this.product.url;
    this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    this.listshow = false;
    ////
    this.Isopening=true;
  }
  btnDelete(product: Product) {
    this.product = product;
    console.log(this.product);
    this.registerForm.addControl('productId', new FormControl('', Validators.required));
    this.registerForm.controls['productId'].patchValue(product.productId);
    this.registerForm.controls['productName'].patchValue(product.productName);
    this.registerForm.controls['categoryId'].patchValue(product.categoryID);
    this.registerForm.controls['subcategoryId'].patchValue(product.subCategoryId);
    this.registerForm.controls['productDescription'].patchValue(product.productDescription);
    this.registerForm.controls['UOMId'].patchValue(product.uomId);
    this.registerForm.controls['expireDate'].patchValue(product.expireDate);
    this.registerForm.controls['minOrder'].patchValue(product.minOrder);
    this.registerForm.controls['maxOrder'].patchValue(product.maxOrder);
    this.registerForm.controls['reOrderlevel'].patchValue(product.reOrderlevel);
    this.registerForm.controls['cpu'].patchValue(product.cpu);
    this.registerForm.controls['RPU'].patchValue(0);
    this.productService.delete(this.registerForm.value).subscribe(result => {
      this.alertService.success("Success Delete");
      this.listshow = true;
      this.onReset();
      window.scroll(0, 0);
    }, error => {

      this.alertService.error(error);
      window.scroll(0, 0);
    });

  }
  onSelectFile(fileInput: any) {
    this.selectedFile = <File>fileInput.target.files[0];
    var mimeType = this.selectedFile.type;
    if (mimeType.match(/image\/*/) == null) {
      this.alertService.error("Only images are supported.");
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.image = reader.result;
    }
  }
  onCategoryChange(CategoryId) {

    this.subfilter = [];
    this.subfilter = this.subcategoryall.filter((item) => CategoryId.includes(item.categoryId));
  }

  onSelect(categoryID) {
    this.subcategoryallfilter = [];
    this.subcategoryallfilter = this.subcategoryall.filter((item) => item.categoryId == categoryID);
    this.subcate = true;
  }
  getProduct() {
    this.productService.getAll().subscribe(result => {
      console.log(result);
      this.productall = result as Product[];
      this.productnamelist = this.productall.map(e => e.productName);
      this.dtTrigger.next();
    }, error => {
      console.error(error)
      //this.alertService.error(error);
      window.scroll(0, 0);
    });;
  }
  filtersubmit() {
    this.productfilter.productName = this.productfilter.productName == null ? '' : this.productfilter.productName.toString();
    this.productfilter.categoryID = this.productfilter.categoryID == null ? '' : this.productfilter.categoryID.toString();
    this.productfilter.uomId = this.productfilter.uomId == null ? '' : this.productfilter.uomId.toString();
    this.productfilter.subCategoryId = this.productfilter.subCategoryId == null ? '' : this.productfilter.subCategoryId.toString();
    var sdate = this.productfilter.sexpireDate == null ? '' : this.productfilter.sexpireDate.toLocaleDateString();
    var edate = this.productfilter.eexpireDate == null ? '' : this.productfilter.eexpireDate.toLocaleDateString();
    this.productService.getAllProductFilter(this.productfilter.productName, this.productfilter.categoryID, this.productfilter.subCategoryId, this.productfilter.uomId, sdate, edate).subscribe(result => {
      console.log(result);
      this.productall = result as Product[];
      this.productnamelist = this.productall.map(e => e.productName);
    }, error => {
      console.error(error)
      this.alertService.error(error);
      window.scroll(0, 0);
    });;
  }
  getcategory() {

    this.category.getAll().subscribe(result => {

      console.log(result);
      this.categoryall = result as Category[];
    }, error => {
      console.error(error)
      //this.alertService.error(error);
      window.scroll(0, 0);
    });;
  }
  getsubcategory() {
    this.subcategoryService.getAll().subscribe(result => {
      console.log(result);
      this.subcategoryall = result as Subcategory[];
    }, error => {
      console.error(error)
      //this.alertService.error(error);
      window.scroll(0, 0);
    });;
  }
  getuom() {

    this.uomService.getAll().subscribe(result => {

      console.log(result);
      this.uomall = result as UOM[];
    }, error => {
      console.error(error)
      //this.alertService.error(error);
      window.scroll(0, 0);
    });;
  }
  getBranch(companyId) {
    this.branchService.getAll().subscribe(result => {
      
      this.branchall = result as Branch[];
      // this.branchall = this.branchall.filter(e=>e.companyId==companyId);
      this.FrombranchCompany= this.branchall.filter(e=> e.isSubBranch!=true ) as Branch[];
      this.FromSubbranchCompany = this.branchall.filter(e=> e.isSubBranch==true) as Branch[];
      console.log("dfdf",this.FrombranchCompany);
    }, error => {
      console.error(error)
      //this.alertService.error(error);
      window.scroll(0, 0);
    });;
  }
  getcompany(){
    this.companyService.getAll().subscribe(result => {
      console.log(result);
      this.companyall = result as Company[];
    }, error => {
      console.error(error)
      //this.alertService.error(error);
      window.scroll(0, 0);
    });;

  }
  onReset() {
    this.getProduct();
    this.submitted = false;
    this.registerForm.reset();
    this.listshow = true
    this.subcate = false;
  }
  opeonrpt() {

    this.productfilter.productName = this.productfilter.productName == null ? '' : this.productfilter.productName.toString();
    this.productfilter.categoryID = this.productfilter.categoryID == null ? '' : this.productfilter.categoryID.toString();
    this.productfilter.uomId = this.productfilter.uomId == null ? '' : this.productfilter.uomId.toString();
    this.productfilter.subCategoryId = this.productfilter.subCategoryId == null ? '' : this.productfilter.subCategoryId.toString();
    var sdate = this.productfilter.sexpireDate == null ? '' : this.productfilter.sexpireDate.toLocaleDateString();
    var edate = this.productfilter.eexpireDate == null ? '' : this.productfilter.eexpireDate.toLocaleDateString();

    this.productService.downloadPdf(this.productfilter.productName, this.productfilter.categoryID, this.productfilter.subCategoryId, this.productfilter.uomId, sdate, edate).subscribe((data: Blob) => {
      let fileURL = window.URL.createObjectURL(data);
      window.open(fileURL);
    });
  }
  private filter(value: string): string[] {
    const filterValue = value;
    var data = this.productnamelist.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
    return data;
  }
  onModelChange(value: string) {
    this.filteredNgModelOptions$ = of(this.filter(value));
  }
  onResetfilter() {

  }
  openstockcheck(value){
    this.Isopening=true;
if(value != null ){
this.Isopening=true;
  }
}
}