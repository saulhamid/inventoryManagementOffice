import { Component, OnInit } from '@angular/core';
import { GlobalsetupService } from '../../_services/setup/globalSetup.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from '../../_services';
import { EnvGlobalSetup } from '../../_models/setup/globalsetup';

import { Subject, Observable, of } from 'rxjs';
import { data } from 'jquery';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'ngx-globalsetup',
  templateUrl: './globalsetup.component.html',
  styleUrls: ['./globalsetup.component.scss']
})
export class GlobalsetupComponent implements OnInit {

  constructor(private globalsetupService: GlobalsetupService, private alertService: AlertService, 
    private formBuilder: FormBuilder, private sanitizer: DomSanitizer) { }
  registerForm: FormGroup;
  submitted = false;
  envGlobalSetup: EnvGlobalSetup;
  Isopening = false;
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  filteredNgModelOptions$: Observable<string[]>;
  ngOnInit() {

    this.getAllData();
    
    this.registerForm = this.formBuilder.group({
      id: [''],
      directIndent: [''],
      multipleApprove: [''],
      singleCompany: [''],
    });
    
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  Save() {
    
    // const formData = new FormData();
    // formData.append('directIndent', this.registerForm.controls["directIndent"].value);
    // formData.append('multipleApprove', this.registerForm.controls["multipleApprove"].value);
    
  
    // formData.append('id', this.registerForm.controls["id"].value);
    // envGlobalSetupNew.directIndent = this.registerForm.controls["directIndent"].value;
    // envGlobalSetupNew.multipleApprove = this.registerForm.controls["multipleApprove"].value;
    // envGlobalSetupNew.id = this.registerForm.controls["id"].value;
console.log(this.envGlobalSetup);
debugger;
    this.globalsetupService.update(this.envGlobalSetup).subscribe(result => {

      this.alertService.success("Success Update");
      this.getAllData();
      window.scroll(0, 0);
    }, error => {

      this.alertService.error(error);
      window.scroll(0, 0);
    });
    
  }
 
  
 
 
  getAllData() {
    this.globalsetupService.getAll()
    .subscribe(result => {
      console.log(result);
      this.envGlobalSetup=result as EnvGlobalSetup;
      debugger;
      // this.registerForm.controls['id'].patchValue(this.envGlobalSetup.id);
      // this.registerForm.controls['directIndent'].patchValue(this.envGlobalSetup.directIndent);
      // this.registerForm.controls['multipleApprove'].patchValue(this.envGlobalSetup.multipleApprove);
      // this.dtTrigger.next();
    }, error => {
      console.error(error)
      //this.alertService.error(error);
      window.scroll(0, 0);
    });;
  }
  

  
  onModelChange(value: string) {
    
  }
  onResetfilter() {

  }
  
}