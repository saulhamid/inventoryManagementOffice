import { Component, OnInit, TemplateRef } from '@angular/core';
import { RoleServiceService } from '../_services/role-service.service';
import { AlertService } from '../_services';
import { Role } from '../_models/role';
import { NbDialogService } from '@nebular/theme';


@Component({
  selector: 'app-userlist',
  templateUrl: './rolelist.component.html',
  styleUrls: ['./rolelist.component.scss']
})
export class rolselistComponent implements OnInit {
  submitted: boolean;
  registerForm: any;
  constructor( private dialogService: NbDialogService, private roleServiceService: RoleServiceService,private alertService:AlertService) { }
  roleall =null;
role:Role;
get f() { return this.registerForm.controls; }
  ngOnInit() {
    this.role=new Role();
    this.getrole();
  }
  save(ref) {
 
    this.submitted = true;
    if(typeof this.role.id=== 'undefined'){
    // stop here if form is invalid
    this.roleServiceService.Create(this.role).subscribe(result => {
       
      window.scroll(0, 0);
      this.alertService.success("Success Insert");
      ref.close();
      this.getrole();
    }, error => {
       
      this.alertService.error(error);
      window.scroll(0, 0);
    });
  }else{
// stop here if form is invalid
this.roleServiceService.update(this.role).subscribe(result => {
   
  window.scroll(0, 0);
  this.alertService.success("Success Update");
  this.getrole();
  ref.close();
}, error => {
   
  this.alertService.error(error);
  window.scroll(0, 0);
});
  }
  }
  btnDelete(data){
    this.roleServiceService.Delete(data).subscribe(result => {
       
      window.scroll(0, 0);
      this.alertService.success("Success Delete");
      this.getrole();
    }, error => {
       
      this.alertService.error(error);
      window.scroll(0, 0);
    });
  }
  getrole(){
  this.roleServiceService.getAll().subscribe(result => {
     
      console.log(result);
      // this.designationList = JSON.parse(this.resultMaster.Data);
      this.roleall = result as Role;
  }, error => {
    console.error(error)
    this.alertService.error(error);
    window.scroll(0, 0);
  });;
  }
  open2(dialog: TemplateRef<any>,data) {
     ;
    if(data != null){
    this.role.Name=data.name;
    this.role.id=data.id;
    }
    this.dialogService.open(
      dialog,
      { context: data });
  }
}
