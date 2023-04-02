import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertService } from '../../../_services';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Category } from '../../../_models/setup/category';
import { CategoryService } from '../../../_services/setup/categoryService.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'ngx-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements  OnInit {

  constructor(  private categoryService: CategoryService,private alertService:AlertService,
    private formBuilder: FormBuilder) { }
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    @ViewChild(DataTableDirective)
    dtElement: any;

    ngAfterViewInit(): void {
      this.dtTrigger.next();
    }
  
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
  
    rerender(): void {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    }
    registerForm: FormGroup;
  submitted = false;
categoryall  : Category[];
  Category : Category;
  listshow=true;
  
  ngOnInit() {
    this.listshow=true
    this.getCategory();
    this.registerForm = this.formBuilder.group({
      Name: ['', Validators.required]
  });
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 25,
    processing: true
  };
  }
   // convenience getter for easy access to form fields
   get f() { return this.registerForm.controls; }

   onSubmit() {
       this.submitted = true;
       if (this.registerForm.invalid) {
           return;
       }
       if(!this.Category){
        this.categoryService.Create(this.registerForm.value).subscribe(result => {
           
          this.alertService.success("Success Insert");
          this.getCategory();
          this.listshow=true;
            window.scroll(0, 0);
        }, error => {
           
          this.alertService.error(error);
          window.scroll(0, 0);
        });
       }else{
        this.categoryService.udate(this.registerForm.value).subscribe(result => {
          this.alertService.success("Success Update");
          this.getCategory();
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
btnEdit(Category:Category ){
  this.Category=Category;
  this.listshow=false;
  this.registerForm.addControl('Id', new FormControl('', Validators.required));
  this.registerForm.setValue({
    Name: Category.name,
    Id: Category.id
  });
 this.rerender();
  this.listshow=false;
}
btnDelete(Category:Category ){
  this.Category=Category;
  this.registerForm.addControl('Id', new FormControl('', Validators.required));
  this.registerForm.setValue({
    Name: Category.name,
    Id: Category.id
  });
  this.categoryService.delete(this.registerForm.value).subscribe(result => {
    this.alertService.success("Success Delete");
    this.getCategory();
    this.listshow=true;
      window.scroll(0, 0);
  }, error => {
    this.alertService.error(error);
    window.scroll(0, 0);
  });
}
getCategory(){
    this.categoryService.getAll().subscribe(result => {
        this.categoryall = result as Category[];
        this.rerender();
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
