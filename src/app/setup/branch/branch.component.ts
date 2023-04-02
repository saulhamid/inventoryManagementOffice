import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Branch } from "../../_models/setup/Branch";
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from "@angular/forms";
import { BranchService } from "../../_services/setup/branchService.service";
import { AlertService } from "../../_services";
import { CompanyService } from "../../_services/setup/companyservice.service";
import { Company } from "../../_models/setup/company";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { environment } from "../../../environments/environment";
import { DataTableDirective } from "angular-datatables";

@Component({
  selector: "ngx-branch",
  templateUrl: "./branch.component.html",
  styleUrls: ["./branch.component.scss"],
})
export class BranchComponent implements OnDestroy, OnInit {
  constructor(
    private http: HttpClient,
    private branchService: BranchService,
    private alertService: AlertService,
    private companyService: CompanyService,
    private formBuilder: FormBuilder
  ) {}
  registerForm: FormGroup;
  submitted = false;
  branchall: Branch[];
  Branch: Branch;
  listshow = true;
  companyall: Company[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  @ViewChild(DataTableDirective)
  dtElement: any;

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

  ngOnInit() {
    //$.fn.dataTable.ext.errMode = 'none';

    $("#table").on("error.dt", function (e, settings, techNote, message) {
      console.log("An error has been reported by DataTables: ", message);
    });

    this.listshow = true;

    this.getBranch();
    this.getcompany();
    this.registerForm = this.formBuilder.group({
      branchName: ["", Validators.required],
      companyId: ["", Validators.required],
      Address: ["", Validators.required],
      Phone: ["", Validators.required],
      Mobile: ["", Validators.pattern],
      Fax: [""],
      VatRegNo: [""],
      IsSubBranch: [""],
      branchCode: [""],
    });
    this.registerForm.controls["companyId"].patchValue("0");
    const that = this;
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      processing: true,
    };
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    
   
    if (
      this.registerForm.controls["companyId"].value == null ||
      this.registerForm.controls["companyId"].value == "0"
    ) {
      this.alertService.error("Company Required");
      return;
    }



    if (this.registerForm.invalid) {
      return;
    }

    if (!this.Branch) {
      this.branchService.Create(this.registerForm.value).subscribe(
        (result) => {
          this.alertService.success("Success Insert");
          this.getBranch();
          this.onReset();
          this.listshow = true;
          window.scroll(0, 0);
        },
        (error) => {
          this.alertService.error(error);
          window.scroll(0, 0);
        }
      );
    } else {
      this.branchService.udate(this.registerForm.value).subscribe(
        (result) => {
          this.alertService.success("Success Update");
          this.getBranch();
          this.onReset();
          window.scroll(0, 0);
        },
        (error) => {
          this.alertService.error("Not Update");
          window.scroll(0, 0);
        }
      );
    }
  }
  btnadd() {
    this.listshow = false;
    this.registerForm.controls["companyId"].patchValue("0");
  }
  btnEdit(branch: Branch) {

    this.Branch = branch;
    this.listshow = false;
    this.registerForm.addControl(
      "id",
      new FormControl("", Validators.required)
    );
    this.registerForm.controls["branchName"].patchValue(branch.branchName);
    this.registerForm.controls["companyId"].patchValue(branch.companyId);
    this.registerForm.controls["id"].patchValue(branch.id);
    this.registerForm.controls["Address"].patchValue(branch.address);
    this.registerForm.controls["Fax"].patchValue(branch.fax);
    this.registerForm.controls["Mobile"].patchValue(branch.mobile);
    this.registerForm.controls["Phone"].patchValue(branch.phone);
    this.registerForm.controls["VatRegNo"].patchValue(branch.vatRegNo);
    this.registerForm.controls["IsSubBranch"].patchValue(branch.isSubBranch);

    this.listshow = false;
  }
  btnDelete(branch: Branch) {
    this.alertService.confirmation().onClose.subscribe((name) => {
      if (name == true) {
        this.Branch = branch;
        this.registerForm.addControl(
          "id",
          new FormControl("", Validators.required)
        );
        this.registerForm.controls["branchName"].patchValue(branch.branchName);
        this.registerForm.controls["companyId"].patchValue(branch.companyId);
        this.registerForm.controls["id"].patchValue(branch.id);
        this.registerForm.controls["branchCode"].patchValue(branch.branchCode);

        this.branchService.delete(this.registerForm.value).subscribe(
         
          (result) => {
            debugger;
            this.alertService.success("Success Delete");

            this.getBranch();
            this.onReset();
            window.scroll(0, 0);
          },
          (error) => {
            debugger;
            this.alertService.error(error);
            window.scroll(0, 0);
          }
        );
        this.getBranch();
      }
    });
  }
  getBranch() {
    this.branchService.getAll().subscribe(
      (result) => {
       
        //console.log(result);
        this.branchall = result as Branch[];
        this.rerender();
        //this.dtTrigger.next();
      },
      (error) => {
      
        console.error(error);
        this.alertService.error("Data Not Found");
        window.scroll(0, 0);
      }
    );
  }

  getcompany() {
    this.companyService.getAll().subscribe(
      (result) => {
        console.log(result);
        this.companyall = result as Company[];
      },
      (error) => {
        console.error(error);
        this.alertService.error(error);
        window.scroll(0, 0);
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
    
    //this.getBranch();
    this.listshow = true;
    this.rerender();
    //window.scroll(0, 0);
  
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    debugger;
    //   this.dtTrigger.unsubscribe();
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
