// import { Component, OnInit } from '@angular/core';
//  import { ProductService } from '../../_services/setup/productService.service';
//  import { AlertService } from '../../_services';
// import { UOMService } from '../../_services/setup/uomService.service';
//  import { CategoryService } from '../../_services/setup/categoryService.service';
//  import { SubcategoryService } from '../../_services/setup/subcategoryService.service';
//  import { Product } from '../../_models/setup/Product';
//  import { UOM } from '../../_models/setup/UOM';
//  import { Category } from '../../_models/setup/category';
//  import { Subcategory } from '../../_models/setup/subcategory';
//  import { Subject, Observable, of } from 'rxjs';
//  import { Stock } from '../../_models/stock/stock';
//  import { Supplier } from '../../_models/setup/Supplier';
//  import { SupplierService } from '../../_services/setup/supplierService.service';

// @Component({
//   selector: 'ngx-requirmentAnalysis',
//   templateUrl: './requirmentAnalysis.component.html',
//   styleUrls: ['./requirmentAnalysis.component.scss']
// })
// export class RequirmentAnalysisComponent implements OnInit {
//   productnamelist: string[];
//   productall: Product[];
//   constructor(  private productService: ProductService,private alertService:AlertService,  private uomService: UOMService,
//     private category:CategoryService,private subcategoryService: SubcategoryService,private supplierService:SupplierService) { }
//   submitted = false;
//   stockall  : Stock[];
//   stock : Stock;
//   stockfilter : Stock;
//   listshow=true;
//   subcate=false;
//   uomall  : UOM[];
//   categoryall  : Category[];
//   subcategoryall  : Subcategory[];
//   subcategoryallfilter  : Subcategory[];
//   dtOptions: DataTables.Settings = {};
//   dtTrigger: Subject<any> = new Subject();
//   supplierall : Supplier[];
//   filteredNgModelOptions$: Observable<string[]>;
//   reportType:string[];
//   ngOnInit() {
//     this.listshow=true
//     this.subcate=false;
//     this.getProduct();
//     this.getcategory();
//     this.getsubcategory();
//     this.getuom();
//     this.getSupplier();
//     this.stockfilter=new Stock;
//     this.filteredNgModelOptions$ = of(this.productnamelist);
//     this.reportType=['ProductWise','CategoryWise','SubCategoryWise','SupplierWise'];
//   this.dtOptions = {
//     pagingType: 'full_numbers',
//     pageLength: 5,
//     processing: true
//   };
//   this.stockfilter.rptType='ProductWise';
//   }
// onSelect(categoryID) {
//   this.subcategoryallfilter=[];
//   this.subcategoryallfilter=this.subcategoryall.filter((item) => item.categoryId == categoryID);
//   this.subcate=true;
// }
// getStock(){
   
//     this.productService.getAll().subscribe(result => {
       
//         console.log(result);
//         this.stockall = result as Stock[];
//     }, error => {
//       console.error(error)
//       this.alertService.error(error);
//       window.scroll(0, 0);
//     });;
//     }
// getProduct(){
   
//     this.productService.getAll().subscribe(result => {
       
//         console.log(result);
//         this.productall = result as Product[];
//         this.productnamelist=this.productall.map(e=>e.productName);
      
//     }, error => {
//       console.error(error)
//       this.alertService.error(error);
//       window.scroll(0, 0);
//     });;
//     }
//     filtersubmit(){
       
//       this.stockfilter.productName=this.stockfilter.productName == null ? '':this.stockfilter.productName.toString();
//       this.stockfilter.categoryID=this.stockfilter.categoryID == null ? '':this.stockfilter.categoryID.toString();
//       this.stockfilter.uomId=this.stockfilter.uomId == null ? '':this.stockfilter.uomId.toString();
//       this.stockfilter.subCategoryId= this.stockfilter.subCategoryId == null ? '': this.stockfilter.subCategoryId.toString();
//       this.stockfilter.supId= this.stockfilter.supId == null ? '': this.stockfilter.supId.toString();
//       this.stockall=null;
//       var date= this.stockfilter.expireDate == null ? '' : this.stockfilter.expireDate.toLocaleDateString();
//         this.productService.getAllStockFilter(this.stockfilter.productName, this.stockfilter.categoryID,this.stockfilter.subCategoryId,this.stockfilter.uomId,date).subscribe(result => {
           
//             console.log(result);
//             this.stockall = result as Stock[];
//             this.productnamelist=this.productall.map(e=>e.productName);
//             this.dtTrigger.next();
//         }, error => {
//           console.error(error)
//           this.alertService.error(error);
//           window.scroll(0, 0);
//         });;
//         }
//     getcategory(){
       
//         this.category.getAll().subscribe(result => {
           
//             console.log(result);
//             this.categoryall = result as Category[];
//         }, error => {
//           console.error(error)
//           this.alertService.error(error);
//           window.scroll(0, 0);
//         });;
//         }
//         getsubcategory(){
           
//             this.subcategoryService.getAll().subscribe(result => {
               
//                 console.log(result);
//                 this.subcategoryall = result as Subcategory[];
//             }, error => {
//               console.error(error)
//               this.alertService.error(error);
//               window.scroll(0, 0);
//             });;
//             }
//             getuom(){
               
//                 this.uomService.getAll().subscribe(result => {
                   
//                     console.log(result);
//                     this.uomall = result as UOM[];
//                 }, error => {
//                   console.error(error)
//                   this.alertService.error(error);
//                   window.scroll(0, 0);
//                 });;
//                 }
//                 getSupplier(){
                   
                  
//                     this.supplierService.getAll().subscribe(result => {
                       
//                         console.log(result);
//                         this.supplierall = result as Supplier[];
//                         this.dtTrigger.next();
//                     }, error => {
//                       console.error(error)
//                       this.alertService.error(error);
//                       window.scroll(0, 0);
//                     });;
//                     }
            
//     onReset() {
//       this.getProduct();
//       this.submitted = false;
//       this.listshow=true
//       this.subcate=false;
//   }
//   opeonrpt(){
     
//     this.stockfilter.productName=this.stockfilter.productName == null ? '':this.stockfilter.productName.toString();
//     this.stockfilter.categoryID=this.stockfilter.categoryID == null ? '':this.stockfilter.categoryID.toString();
//     this.stockfilter.uomId=this.stockfilter.uomId == null ? '':this.stockfilter.uomId.toString();
//     this.stockfilter.subCategoryId= this.stockfilter.subCategoryId == null ? '': this.stockfilter.subCategoryId.toString();
//     var date= this.stockfilter.expireDate == null ? '' : this.stockfilter.expireDate.toLocaleDateString();
//     this.productService.StockPdf(this.stockfilter.productName, this.stockfilter.categoryID,this.stockfilter.subCategoryId,this.stockfilter.rptType).subscribe((data: Blob) => {
//       let fileURL = window.URL.createObjectURL(data);
//       window.open(fileURL);
//   });
//   }
//   private filter(value: string): string[] {
//     const filterValue = value;
//     var data=this.productnamelist.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
//     return data;
//   }
//   onModelChange(value: string) {
//     this.filteredNgModelOptions$ = of(this.filter(value));
//   }
//   onResetfilter(){
    
//   }
// }











import { Component, OnInit, Optional, TemplateRef,ViewChild } from '@angular/core';
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
import { BranchService } from '../../_services/setup/branchService.service';
import { Requisitionservice } from '../../_services/requisition/requisitionservice.service';
import { StockissueService } from '../../_services/stock/stockissue.service';
import { Requisitionmaster } from '../../_models/requisition/requisitionmaster';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Stockissue } from '../../_models/stock/stockissue';
import { RequirementExtraQty } from '../../_models/requisition/RequirementExtraQty';
import { RequirementAnalysisData } from '../../_models/indent/requirementAnalysisData';
import { Datepickerfrom } from '../../_models/requisition/datepickerfrom';
import { stringify } from '@angular/compiler/src/util';
import { Branch } from '../../_models/setup/Branch';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'ngx-requirmentAnalysis',
  templateUrl: './requirmentAnalysis.component.html',
  styleUrls: ['./requirmentAnalysis.component.scss']
})
export class RequirmentAnalysisComponent implements OnInit {
  productnamelist: string[];
  productall: Product[];
  constructor(  private productService: ProductService,private alertService:AlertService,  private uomService: UOMService,
    private category:CategoryService,private subcategoryService: SubcategoryService,private supplierService:SupplierService,private requisitionservice:Requisitionservice,
    private stockissueService:StockissueService,  private branchService:BranchService,
    private dialogService: NbDialogService,@Optional() private ref: NbDialogRef<RequirmentAnalysisComponent>) { }
  submitted = false;
  stockall  : Stock[];
  Stockissueall  : Stockissue[];
  requirementAnalysisData : RequirementAnalysisData[];
  Stockissue  : Stockissue;
  RequisitionAll:Requisitionmaster[];
  stock : Stock;
  stockfilter : any;
  listshow=true;
  subcate=false;
  branchAll:Branch[];
  uomall  : UOM[];
  branchId : any;
  categoryall  : Category[];
  subcategoryall  : Subcategory[];
  subcategoryallfilter  : Subcategory[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective)
  dtElement: any;
  supplierall : Supplier[];
  filteredNgModelOptions$: Observable<string[]>;
  reportType:string[];
  purchasefilter: any;
  fromDate:any;
  toDate:any;
  ngOnInit() {
    this.listshow=true
    this.subcate=false;
    this.branchId='';
    this.getRequestionDetail();
    this.getRequestionAll();
    this.getProduct();
    this.getcategory();
    this.getsubcategory();
    this.getuom();
    this.getAllBranch();
    this.getSupplier();
    this.fromDate='';
    this.toDate='';
    this.stockfilter=new Stock;
    this.filteredNgModelOptions$ = of(this.productnamelist);
    this.reportType=['ProductWise','CategoryWise','SubCategoryWise','SupplierWise'];
    this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10,
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

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

onSelect(categoryID) {
  this.subcategoryallfilter=[];
  this.subcategoryallfilter=this.subcategoryall.filter((item) => item.categoryId == categoryID);
  this.subcate=true;
}
onExtraQty(branchId:string, categoryName:string, cons_qty:string, deptName:string, employeeId:string, employeeName:string,  pStock:string, productCode:string, productId:string, productName:string, productStock:string, rQty:string, rdt:string, requisitionDetailId:number, requisitionId:string, subCategoryName:string, uomName:string, extraQty: string): void {  
  //console.log( requisitionDetailId+"---------"+ productId+"----"+ requisitionId +" -- "+ extraQty);
       let model : RequirementAnalysisData = {
        requisitionDetailId: requisitionDetailId,
        ExtraQty: extraQty,
       }
      
       console.log(this.Stockissueall);
      // this.requirementAnalysisData.push(model);
       console.log("data: "+ model.requisitionDetailId + "Extra: "+ model.ExtraQty);
  //  this.requisitionservice.postExtraQty(model).subscribe(result=>{
  //   this.alertService.success("Success Product QTY updated");
  //   console.log(result)
  //  },error=>{
  //   console.log(error);
  //  })
}

getAllBranch(){
  this.branchService.getAll().subscribe(result => {
    console.log("branch");
    console.log(result);
    this.branchAll = result as Branch[];

   // this.Stockissueall = result ;
}, error => {
  console.error(error)
  window.scroll(0, 0);
});;
}

filerBranchWise(){
  debugger;
  console.log(this.branchId)
  this.Stockissueall = [];
  this.requisitionservice.getRequestionAnalysisBranchWise(this.branchId).subscribe(result => {
    console.log(result);
    this.Stockissueall = result as Stockissue[];
}, error => {
  console.error(error)
  window.scroll(0, 0);
});;
}


saveAllData(){
  //console.log("Save button clicked")
  console.log(this.Stockissueall)
  debugger;
  this.alertService.confirmation().onClose.subscribe(name =>{
    if(name==true)
    {
      //alert("Doing")
      for(let item of this.Stockissueall){
        if(item.productStock<item.reqty){
          alert("Stock not available");
          return;
        }    
      }

      // this.requisitionservice.postExtraQtyWithAllData(this.Stockissueall).subscribe(result=>{
      //   this.alertService.success("Success Product QTY updated");
      //   window.location.reload();
      //   console.log(result)
      //  },error=>{
      //   console.log(error);
      //  })



       this.requisitionservice.postExtraQtyWithAllData(this.Stockissueall).subscribe((data:Blob)=>{
        let fileURL = window.URL.createObjectURL(data);
         window.open(fileURL);
        //this.alertService.success("Success Product QTY updated");
        window.location.reload();
        //console.log(result)
       },error=>{
        console.log(error);
       })


    }
  })
  
  

 

}


 convert(str:Date){
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return ([date.getFullYear(), mnth, day].join("-")) ;
}



onDatePicker(){
  this.fromDate = this.convert(this.fromDate)
  this.toDate = this.convert(this.toDate)
  //console.log(this.convert(this.fromDate));
  //console.log(this.convert(this.toDate));
  console.log(this.fromDate)
    console.log(this.toDate)
  let data1:Datepickerfrom = {
    fromDate: this.fromDate,
    toDate: this.toDate
  }  

  this.Stockissueall = [];


  this.requisitionservice.postFromToDate(data1).subscribe(result=>{
   
    this.Stockissueall = result as Stockissue[];
    console.log(result)
   },error=>{
    console.log(error);
   })
  
   this.fromDate='';
   this.toDate='';

}
 onExtraQtyGlobal( extraQty: Number): void {  
  
      var dataOfReq :  Array<RequirementExtraQty>=[];


      // this.Stockissueall.forEach(element => {
      //   element.ExtraQty22 = extraQty;
      
      // });
     // console.log(this.Stockissueall);

   

      this.Stockissueall.forEach(element => {
        let model: RequirementExtraQty = {
          requisitionDetailId:element.requisitionDetailId,
          extraQty:element.ExtraQty22
        }
        dataOfReq.push(model);
        
      });

      this.Stockissueall.forEach(e=>{
         e.reqty =  Math.abs(Math.ceil((e.rQty * Number(extraQty))/100)),
         e.extraQty = Math.abs((Number(e.extraQty)+ Math.ceil((e.rQty * Number(extraQty))/100)))
        //e.reqty = Number(extraQty) 
      })

      console.log( this.Stockissueall)

      this.Stockissueall = this.Stockissueall

      //  this.requisitionservice.postExtraQtyGlobal(dataOfReq).subscribe(result=>{
      //     console.log(result)
      //    },error=>{
      //     console.log(error);
      //    })
      
      //console.log(dataOfReq)
  
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
            
            this.rerender();
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
                        //this.dtTrigger.next();
                        
                        this.rerender();
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
