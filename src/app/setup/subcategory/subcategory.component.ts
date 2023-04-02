import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SubcategoryService } from '../../_services/setup/subcategoryService.service';
import { AlertService } from '../../_services';
import { Subcategory } from '../../_models/setup/subcategory';
import { Category } from '../../_models/setup/category';
import { CategoryService } from '../../_services/setup/categoryService.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {

  constructor(  private subcategoryService: SubcategoryService,private categoryService: CategoryService,private alertService:AlertService,
    private formBuilder: FormBuilder) { }
    registerForm: FormGroup;
  submitted = false;
  categoryall  : Category[];
  subcategoryall  : Subcategory[];
  Subcategory : Subcategory;

  listshow=true;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  ngOnInit() {
    this.listshow=true
    this.getSubcategory();
   
    this.registerForm = this.formBuilder.group({
      Name: ['', Validators.required],
      CategoryId: ['', Validators.required]
  });
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    processing: true
  };
  }
   // convenience getter for easy access to form fields
   get f() { return this.registerForm.controls; }

   onSubmit() {
      
       this.submitted = true;
       // stop here if form is invalid
       if (this.registerForm.invalid) {
           return;
       }
       if(!this.Subcategory){
        this.subcategoryService.Create(this.registerForm.value).subscribe(result => {
           
          this.alertService.success("Success Insert");
          this.getSubcategory();
          this.onReset();
            window.scroll(0, 0);
        }, error => {
           
          this.alertService.error(error);
          window.scroll(0, 0);
        });
       }else{
        this.subcategoryService.udate(this.registerForm.value).subscribe(result => {
           
          this.alertService.success("Success Update");
          this.getSubcategory();
          this.onReset();
            window.scroll(0, 0);
        }, error => {
           
          this.alertService.error(error);
          window.scroll(0, 0);
        });
       }
       
   }
btnadd(){
  this.listshow=false;
  this.registerForm.controls['CategoryId'].patchValue('');
  this.getCategory();

}
btnEdit(subcategory:Subcategory ){
   
  this.getCategory();
  this.Subcategory=subcategory;

  this.registerForm.addControl('Id', new FormControl('', Validators.required));
  this.registerForm.controls['Name'].patchValue(subcategory.name);
  this.registerForm.controls['Id'].patchValue(subcategory.id);
  this.registerForm.controls['CategoryId'].patchValue(subcategory.categoryId);
  this.listshow=false;
}
btnDelete(subcategory:Subcategory ){
  this.registerForm.addControl('Id', new FormControl('', Validators.required));
  this.registerForm.setValue({
    Name: subcategory.name,
    Id: subcategory.id,
    CategoryId:subcategory.categoryId
  });
  this.subcategoryService.delete(this.registerForm.value).subscribe(result => {
    this.alertService.success("Success Delete");
    this.getSubcategory();
    this.listshow=true;
      window.scroll(0, 0);
  }, error => {
     
    this.alertService.error(error);
    window.scroll(0, 0);
  });
  this.Subcategory=subcategory;
}
getSubcategory(){
   
    this.subcategoryService.getAll().subscribe(result => {
       
        console.log(result);
        this.subcategoryall = result as Subcategory[];
        this.dtTrigger.next();
    }, error => {
      console.error(error)
      this.alertService.error(error);
      window.scroll(0, 0);
    });
    }
    getCategory(){
       
        this.categoryService.getAll().subscribe(result => {
           
            console.log(result);
            this.categoryall = result as Category[];
            this.alertService.success("Success");
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
