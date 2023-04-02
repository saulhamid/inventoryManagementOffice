import { Component, OnInit } from "@angular/core";
import { SectionService } from "../../_services/setup/sectionService.service";
import { AlertService } from "../../_services";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { Section } from "../../_models/setup/section";
import { Branch } from "../../_models/setup/Branch";
import { BranchService } from "../../_services/setup/branchService.service";
import { Subject } from "rxjs";

@Component({
  selector: "ngx-section",
  templateUrl: "./section.component.html",
  styleUrls: ["./section.component.scss"],
})
export class SectionComponent implements OnInit {
  constructor(
    private sectionService: SectionService,
    private alertService: AlertService,
    private branchService: BranchService,
    private formBuilder: FormBuilder
  ) {}
  registerForm: FormGroup;
  submitted = false;
  sectionall: Section[];
  branchall: Branch[];
  Section: Section;
  listshow = true;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  ngOnInit() {
    this.listshow = true;
    this.getSection();
    this.getBranch();
    this.registerForm = this.formBuilder.group({
      secName: ["", Validators.required],
      branchId: ["0", Validators.required],
    });
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 5,
      processing: true,
    };
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    if (
      this.registerForm.controls["branchId"].value == null ||
      this.registerForm.controls["branchId"].value == "0"
    ) {
      this.alertService.error("Branch Required");
      return;
    }
    if (!this.Section) {
      this.sectionService.Create(this.registerForm.value).subscribe(
        (result) => {
          this.alertService.success("Success Insert");
          this.getSection();
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
      this.sectionService.udate(this.registerForm.value).subscribe(
        (result) => {
          this.alertService.success("Success Update");
          this.getSection();
          this.onReset();
          window.scroll(0, 0);
        },
        (error) => {
          this.alertService.error(error);
          window.scroll(0, 0);
        }
      );
    }
  }
  btnadd() {
    this.listshow = false;
    this.registerForm.controls["branchId"].patchValue("0");
  }
  btnEdit(section: Section) {
    this.Section = section;
    this.listshow = false;
    this.registerForm.addControl(
      "Id",
      new FormControl("", Validators.required)
    );
    this.registerForm.controls["secName"].patchValue(section.secName);
    this.registerForm.controls["branchId"].patchValue(section.branchId);
    this.registerForm.controls["Id"].patchValue(section.id);
    this.listshow = false;
  }
  btnDelete(section: Section) {
    this.alertService.confirmation().onClose.subscribe((name) => {
      if (name == true) {
        this.Section = section;
        this.registerForm.addControl(
          "Id",
          new FormControl("", Validators.required)
        );
        this.registerForm.controls["secName"].patchValue(section.secName);
        this.registerForm.controls["branchId"].patchValue(section.branchId);
        this.registerForm.controls["Id"].patchValue(section.id);
        this.sectionService.delete(this.registerForm.value).subscribe(
          (result) => {
            this.alertService.success("Success Delete");
            this.getSection();
            this.getBranch();
            this.listshow = true;
            this.onReset();
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
  getSection() {
    this.sectionService.getAll().subscribe(
      (result) => {
        console.log(result);
        this.sectionall = result as Section[];
        this.dtTrigger.next();
      },
      (error) => {
        console.error(error);
        this.alertService.error(error);
        window.scroll(0, 0);
      }
    );
  }
  getBranch() {
    this.branchService.getAll().subscribe(
      (result) => {
        console.log(result);
        this.branchall = result as Branch[];
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
    this.listshow = true;
  }
}
