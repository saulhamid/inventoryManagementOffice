import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { AlertService } from "../../../_services";
import { Company } from "../../../_models/setup/company";
import { CompanyService } from "../../../_services/setup/companyservice.service";
import { Subject } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";
import { NbDialogService } from "@nebular/theme";
import { EnvGlobalSetup } from '../../../_models/setup/globalsetup';
import { GlobalsetupService } from '../../../_services/setup/globalSetup.service';

@Component({
  selector: "ngx-company",
  templateUrl: "./company.component.html",
  styleUrls: ["./company.component.scss"],
})
export class CompanyComponent implements OnInit {
  selectedFile: File;
  image: any;
  isSingleCompany: boolean = false;
  constructor(
    private companyService: CompanyService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private dialogService: NbDialogService,
    private globalsetupService: GlobalsetupService,
  ) {}
  registerForm: FormGroup;
  submitted = false;
  companyall: Company[];
  company: Company;
  listshow = true;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  envGlobalSetup: EnvGlobalSetup;
  
  ngOnInit() {
    this.listshow = true;
    this.getcompany();
    this.registerForm = this.formBuilder.group({
      CompanyName: ["", Validators.required],
      Address: ["", Validators.required],
      Phone: ["", Validators.required],
      Mobile: ["", Validators.pattern],
      Fax: [""],
      VatRegNo: [""],
    });
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
    debugger;
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append(
      "CompanyName",
      this.registerForm.controls["CompanyName"].value
    );
    formData.append("Address", this.registerForm.controls["Address"].value);
    formData.append("Phone", this.registerForm.controls["Phone"].value);
    formData.append("Mobile", this.registerForm.controls["Mobile"].value);
    formData.append("Fax", this.registerForm.controls["Fax"].value);
    formData.append("VatRegNo", this.registerForm.controls["VatRegNo"].value);
    formData.append("Image", this.selectedFile);
    if (typeof this.company == "undefined") {
      this.companyService.Create(formData).subscribe(
        (result) => {
          this.alertService.success("Success Insert");
          this.getcompany();
          this.listshow = true;
          window.scroll(0, 0);
        },
        (error) => {
          this.alertService.error(error);
          window.scroll(0, 0);
        }
      );
    } else {
      formData.append("ID", this.company.id);
      this.companyService.udate(formData).subscribe(
        (result) => {
          this.alertService.success("Success Update");
          this.getcompany();
          this.listshow = true;
          window.scroll(0, 0);
        },
        (error) => {
          this.alertService.error(error);
          window.scroll(0, 0);
        }
      );
    }
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
    };
  }
  btnadd() {
    this.listshow = false;
  }
  btnEdit(company: Company) {
    this.company = company;
    this.listshow = false;
    this.registerForm.addControl(
      "Id",
      new FormControl("", Validators.required)
    );
    this.registerForm.setValue({
      Address: company.address,
      CompanyName: company.companyName,
      Fax: company.fax,
      Mobile: company.mobile,
      Phone: company.phone,
      VatRegNo: company.vatRegNo,
      Id: company.id,
    });
    this.listshow = false;
    let objectURL = "data:image/png;base64," + this.company.url;
    this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
  btnDelete(company: Company) {
    this.alertService.confirmation().onClose.subscribe((name) => {
      if (name == true) {
        this.company = company;
        this.registerForm.addControl(
          "Id",
          new FormControl("", Validators.required)
        );
        this.registerForm.setValue({
          Address: company.address,
          CompanyName: company.companyName,
          Fax: company.fax,
          Mobile: company.mobile,
          Phone: company.phone,
          VatRegNo: company.vatRegNo,
          Id: company.id,
        });
        this.companyService.delete(this.registerForm.value).subscribe(
          (result) => {
            this.alertService.success("Success Delete");
            this.getcompany();
            this.listshow = true;
            window.scroll(0, 0);
          },
          (error) => {
            this.alertService.error(error);
            window.scroll(0, 0);
          }
        );
      }
    });
  }
  getcompany() {
    this.companyService.getAll().subscribe(
      (result) => {
        console.log(result);
        this.companyall = result as Company[];
        this.dtTrigger.next();
      },
      (error) => {
        console.error(error);
        this.alertService.error(error);
        window.scroll(0, 0);
      }
    );

    this.globalsetupService.getAll()
    .subscribe(result => {  
      this.envGlobalSetup=result as EnvGlobalSetup;
      debugger;
      this.isSingleCompany = this.envGlobalSetup.singleCompany;
    }, error => {
      console.error(error)
     
      window.scroll(0, 0);
    });
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
    this.listshow = true;
  }
  open2(dialog: TemplateRef<any>, date) {
    this.dialogService.open(dialog, { context: date });
  }


  // getAllData() {
  //   this.globalsetupService.getAll()
  //   .subscribe(result => {  
  //     this.envGlobalSetup=result as EnvGlobalSetup;
  //    return this.envGlobalSetup.singleCompany;
  //   }, error => {
  //     console.error(error)
     
  //     window.scroll(0, 0);
  //   });;
  // }
}
