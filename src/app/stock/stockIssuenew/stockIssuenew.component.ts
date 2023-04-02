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
import { RequisitionNVM } from '../../_models/requisition/RequisitionNVM';

@Component({
  selector: 'ngx-stockIssuenew',
  templateUrl: './stockIssuenew.component.html',
  styleUrls: ['./stockIssuenew.component.scss']
})
export class StockIssueNewComponent implements OnInit {
  productnamelist: string[];
  productall: Product[];
  constructor(  private productService: ProductService,private alertService:AlertService,  private uomService: UOMService,
    private category:CategoryService,private subcategoryService: SubcategoryService,private supplierService:SupplierService,private requisitionservice:Requisitionservice,
    private stockissueService:StockissueService,
    private dialogService: NbDialogService,@Optional() private ref: NbDialogRef<StockIssueNewComponent>) { }
  submitted = false;
  stockall  : Stock[];
  Stockissueall  : Stockissue[];

  RequistionNVM: RequisitionNVM[];
  RequistionNVMBranchWise: RequisitionNVM[] = [];
  RequistionNVMBranchWiseAndRequisitionId: RequisitionNVM[] = [];


  Stockissue  : Stockissue;
  RequisitionAll:Requisitionmaster[];
  stock : Stock;
  stockfilter : any;
  listshow=true;

  branchId:string;
  branchNo:number;

  requisitionNo:string;


  issueQty:number;
  subcate=false;
  uomall  : UOM[];
  categoryall  : Category[];
  subcategoryall  : Subcategory[];
  subcategoryallfilter  : Subcategory[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  supplierall : Supplier[];
  filteredNgModelOptions$: Observable<RequisitionNVM[]>;
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
    this.filteredNgModelOptions$ = of(this.RequistionNVM);
    this.reportType=['ProductWise','CategoryWise','SubCategoryWise','SupplierWise'];

    this.branchId=''
    this.requisitionNo='';

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
    this.requisitionservice.getAllRequisitionStockAndPurchasePSD().subscribe(result => {
        // console.log(result);
         //this.Stockissueall = result as Stockissue[];
         this.RequistionNVM = result as RequisitionNVM[];
        // this.Stockissueall.forEach((currentValue, index) => {
        //   currentValue.qty=currentValue.rQty;
        // });
        console.log("Data-Data")
        console.log(this.RequistionNVM);
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
       
        //console.log(result);
        this.stockall = result as Stock[];
    }, error => {
      console.error(error)
      window.scroll(0, 0);
    });;
    }
getProduct(){
   
    this.productService.getAll().subscribe(result => {
       
        //console.log(result);
        this.productall = result as Product[];
        this.productnamelist=this.productall.map(e=>e.productName);
      
    }, error => {
      console.error(error)
      this.alertService.error(error);
      window.scroll(0, 0);
    });;
    }
    saveAllData(){
      console.log(this.RequistionNVM)
      var flag = true;
      this.RequistionNVM.forEach(element => {
        element.requisitionDetailsProduct.forEach(e=>{
          if(e.issueQty>e.rQty){
            alert("Not Allow");
            flag = false;
            return;
          }
        })
      });


      this.RequistionNVM.forEach(element => {
        element.requisitionDetailsProduct.forEach(e=>{
            e.requisionWiseProduct.forEach(f=>{
              if(e.issueQty> f.psdTotal){
                alert("Stock not");
                flag = false;
                return;
              }
            })
          
        })
      });



     if(flag==true)
     {
       this.stockissueService.StockIssueNew(this.RequistionNVMBranchWiseAndRequisitionId).subscribe((data: Blob)=>{
          alert("Stock Issue Successful");
          let fileURL = window.URL.createObjectURL(data);
          window.open(fileURL);
          this.getRequestionDetail();
      })
     }


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
  private filter(value: string): RequisitionNVM[] {
    //const filterValue = value;
    const filterValue = value.toLowerCase().trim();
    var data=this.RequistionNVM.filter(optionValue => optionValue.branchName.toLowerCase().includes(filterValue));
    return data;
  }
  onModelChange(value: string) {
    this.filteredNgModelOptions$ = of(this.filter(value));
  }
  onResetfilter(){
    
  }
//////////////////////////////////
////////////////////////
  onBranchWiseRequisition(){
    debugger;
    this.branchId;
    this.branchNo = Number(this.branchId);

    this.RequistionNVMBranchWise = []

     var aa  = this.RequistionNVM.filter((e)=>e.branchId==this.branchNo)

     this.RequistionNVMBranchWise.push(aa[0]);
     //this.RequistionNVM = []
     
  }
  //////////////////////////////////////////////
  //////////////////////////////////////
  ///////////////////////////////////
  onBranchWiseRequisitionAndIdWise(){
    debugger;
    this.requisitionNo;
    this.RequistionNVMBranchWiseAndRequisitionId = []
    
    var aa = this.RequistionNVMBranchWise.filter((e)=>e.requisitionId==this.requisitionNo)

    this.RequistionNVMBranchWiseAndRequisitionId.push(aa[0])

  }

  StockIssueForEmployee(Stockissue: Stockissue){

  debugger;
    console.log("Test")
    console.log(Stockissue)

    if(Stockissue.rQty>Stockissue.productStock || Stockissue.productStock<=0)
    {
      alert("Stock is not available")
      return;
    }
    if(Stockissue.qty>Stockissue.rQty)
    {
      alert("Not allowed")
      return;
    }
    else
    {
        
    this.alertService.confirmation().onClose.subscribe(name => {

      console.log("Test")
      console.log(Stockissue)

      if(name==true){
       // debugger
       var data={ProductId:Stockissue.productId,}
        this.stockissueService.Create(Stockissue).subscribe(result => {
          this.alertService.success("Stock Issue Successfull");
          this.getRequestionDetail();
            window.scroll(0, 0);
        }, error => {
         
          window.scroll(0, 0);
        });
      }})
    }
   

    // this.alertService.confirmation().onClose.subscribe(name => {

    //   console.log("Test")
    //   console.log(Stockissue)

    //   if(name==true){
    //    // debugger
    //    var data={ProductId:Stockissue.productId,}
    //     this.stockissueService.Create(Stockissue).subscribe(result => {
    //       this.alertService.success("Stock Issue Successfull");
    //       this.getRequestionDetail();
    //         window.scroll(0, 0);
    //     }, error => {
         
    //       window.scroll(0, 0);
    //     });
    //   }})

  }
}
