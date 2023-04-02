// import { Component, OnInit } from '@angular/core';

// import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import { AccountService, AlertService } from '../_services';
// import { RoleServiceService } from '../_services/role-service.service';
// import { Role } from '../_models/role';
// import { Department } from '../_models/setup/department';
// import { Section } from '../_models/setup/section';
// import { BranchService } from '../_services/setup/branchService.service';
// import { DepartmentService } from '../_services/setup/departmentService.service';
// import { SectionService } from '../_services/setup/sectionService.service';
// import { Branch } from '../_models/setup/Branch';
// import { User } from '../_models/user';
// import { EmployeeService } from '../_services/setup/employeeService.service';
// import { Employee } from '../_models/setup/employee';
// import { Menus } from '../_models/menus';
// import { Router } from '@angular/router';
// import { Subject } from 'rxjs';
// @Component({
//   selector: 'app-userlist',
//   templateUrl: './userlist.component.html',
//   styleUrls: ['./userlist.component.scss']
// })
// export class userlistComponent implements OnInit {
//   departmentall: Department[];
//   branchall: Branch[];
//   sectionall: Section[];
//   departmentallfilter: Department[];
//   sectionallfilter: Section[];
//   user: User;
//   empName:string;
//   employeeall: Employee[];
//   menuslist:Menus[];
//   isEmp: boolean;
//   loadingVisible:  boolean;  
//   constructor(private accountService: AccountService, 
//     private alertService: AlertService,
//      private roleServiceService: RoleServiceService,
//     private formBuilder: FormBuilder,
//     private branchService: BranchService,
//     private departmentService: DepartmentService
//     ,private sectionService:SectionService,
//     private router: Router,
//     private employeeService:EmployeeService) { }
//   registerForm: FormGroup;
//   registerFormNew: FormGroup;
//   submitted = false;
//   userall: User[];
//   userallBak: User[];
//   roleall = null;
//   listshow = true;
//   dtOptions: DataTables.Settings = {};
//   dtTrigger: Subject<any> = new Subject();
  
//   ngOnInit() {
//     this.listshow = true;
//     this.loadingVisible = false;
//     this.isEmp = false;
//     this.getuser();
//     this.getrole();
//     this.empName = '';
//     this.getEmployee();
//     this.registerForm = this.formBuilder.group({
//       Password: ['', Validators.required],
//       ConfirmPassword: ['', Validators.required],
//       username: ['', Validators.required],
//       employeeId: ['', Validators.required],
//       roleId: ['', Validators.required],
//     });


//     this.dtOptions = {
//       pagingType: 'full_numbers',
//       pageLength: 25,
//       processing: true,
//       // destroy:true
//     };
//   }
//   // convenience getter for easy access to form fields
//   get f() { return this.registerForm.controls; }

//   onSubmit() {
//     debugger;
//     this.submitted = true;
//     // stop here if form is invalid
//     // if (this.registerForm.invalid) {
//     //   return;
//     // }
//     if(!this.user){
//       this.accountService.register(this.registerForm.value).subscribe(result => {
       
//         window.scroll(0, 0);
//         location.reload();
//       }, error => {
         
//         this.alertService.error(error);
//         location.reload();
//         window.scroll(0, 0);
//       });
//     }
//     else{
      
//       this.accountService.updateUser(this.registerForm.value).subscribe(result => {
           
//         this.alertService.success("Success Update");
//         this.getuser();
//         this.onReset();
//           window.scroll(0, 0);
//       }, error => {
         
//         this.alertService.error("Not Update");
//         window.scroll(0, 0);
//       });
//     }
    
//     // display form values on success
//     //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
//   }
//   btnadd() {
//     this.listshow = false;
//     this.loadingVisible = false;
//     this.registerForm.controls['employeeId'].patchValue("");
//     this.registerForm.controls['roleId'].patchValue("");
//   }
//   btnEdit(user:User ){
//      debugger;
//     this.user=user;
//     this.listshow=false;
//     //this.loadingVisible = true;
  
//     this.registerForm.addControl('id', new FormControl('', Validators.required));
//     this.registerForm.controls['username'].patchValue(user.employeeName);
//     this.registerForm.controls['employeeId'].patchValue(user.employeeId);
//     this.registerForm.controls['Password'].patchValue(user.Password);
//     this.registerForm.controls['ConfirmPassword'].patchValue(user.ConfirmPassword);
//       //this.registerForm.controls['email'].patchValue(user.Password);
//     this.registerForm.controls['roleId'].patchValue(user.roleId);
//     this.listshow=false;
//     this.loadingVisible = true;
//   }
//   getuser() {
//     this.accountService.getAll().subscribe(result => {
       
//       console.log(result);
//       this.userall = result as User[];
//       this.dtTrigger.next();
//     }, error => {
//       console.error(error)
//       this.alertService.error(error);
//       window.scroll(0, 0);
//     });;
//   }
//   getrole() {
//     this.roleServiceService.getAll().subscribe(result => {
//       console.log(result);
//       // this.designationList = JSON.parse(this.resultMaster.Data);
//       this.roleall = result as Role;
//     }, error => {
//       console.error(error)
//       this.alertService.error(error);
//       window.scroll(0, 0);
//     });;
//   }
  
// getBranch(){
   
//     this.branchService.getAll().subscribe(result => {
       
//         console.log(result);
//         this.branchall = result as Branch[];
//     }, error => {
//       console.error(error)
//       this.alertService.error(error);
//       window.scroll(0, 0);
//     });;
// }
// getDepartment(){
   
//     this.departmentService.getAll().subscribe(result => {
       
//         console.log(result);
//         this.departmentall = result as Department[];
//     }, error => {
//       console.error(error)
//       this.alertService.error(error);
//       window.scroll(0, 0);
//     });;
// }
// getSection(){
   
//     this.sectionService.getAll().subscribe(result => {
       
//         console.log(result);
//         this.sectionall = result as Section[];
//     }, error => {
//       console.error(error)
//       this.alertService.error(error);
//       window.scroll(0, 0);
//     });;
// }
// getEmployee(){
   
//     this.employeeService.getAll().subscribe(result => {
       
//         console.log(result);
//         this.employeeall = result as Employee[];
//     }, error => {
//       console.error(error)
//       this.alertService.error(error);
//       window.scroll(0, 0);
//     });;
// }
// onSelectBranch(branchId) {
//   this.departmentallfilter = this.departmentall.filter((item) => item.branchId == branchId);
//   this.sectionallfilter = this.sectionall.filter((item) => item.branchId == branchId);
// }
// onEmCheck(value){
   
// this.isEmp=value;
// if(value==true){ }
// }
//   onReset() {
//     this.submitted = false;
//     this.registerForm.reset();
//     this.listshow = true
//   }
//   getMenuByUser(UserId) {
//     this.accountService.getusermenu(UserId).subscribe(result => {
       
//       console.log(result);
//       this.menuslist = result as Menus[];
//     }, error => {
//       console.error(error)
//       this.alertService.error(error);
//       window.scroll(0, 0);
//     });;
//   }
//   routetousermenu(aspuserId){
//      ;
//     localStorage.setItem('aspuserId',JSON.stringify(aspuserId));
//     this.router.navigateByUrl(`/pages/account/usermenu`);
//   }
//   btnDelete(Id:string){
    
//     alert("Not Allowed");
//     return;

//     this.accountService.deleteUser(Id,'').subscribe(result => {
       
//       window.scroll(0, 0);
//       this.alertService.success("Success Delete");
//       this.getrole();
//     }, error => {
       
//       this.alertService.error(error);
//       window.scroll(0, 0);
//     });
//   }


//   onKeyUp(data){
//     debugger
        
//         // for (let index = 0; index < this.userall.length; index++) {
//         //   index["employeeName"] = data;
          
//         // }

//         let obj = this.userall.find(o=>o.employeeName===data)

//         let data3 = "aa"
     
//   }
//   searchData(){
//     debugger
//      let userInp = this.empName;
//      this.userallBak = this.userall;
//       var foundItem = this.userall.find(o=>o.employeeName===userInp)
//       if(foundItem==undefined)
//       {
//         foundItem = this.userall.find(o=>o.email===userInp)
//       }
//       // if(foundItem==undefined){
//       //   foundItem = this.userall.find(o=>o.username===userInp)
//       // }
//       this.userall = []
//       this.userall.push(foundItem)

//   }
//   clearSearch(){
//     this.userall = []
//     this.userall = this.userallBak;
//   }
// }
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AccountService, AlertService } from '../_services';
import { RoleServiceService } from '../_services/role-service.service';
import { Role } from '../_models/role';
import { Department } from '../_models/setup/department';
import { Section } from '../_models/setup/section';
import { BranchService } from '../_services/setup/branchService.service';
import { DepartmentService } from '../_services/setup/departmentService.service';
import { SectionService } from '../_services/setup/sectionService.service';
import { Branch } from '../_models/setup/Branch';
import { User } from '../_models/user';
import { EmployeeService } from '../_services/setup/employeeService.service';
import { Employee } from '../_models/setup/employee';
import { Menus } from '../_models/menus';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class userlistComponent implements OnInit {
  departmentall: Department[];
  branchall: Branch[];
  sectionall: Section[];
  departmentallfilter: Department[];
  sectionallfilter: Section[];
  user: User;
  empName:string;
  employeeall: Employee[];
  menuslist:Menus[];
  isEmp: boolean;
  loadingVisible:  boolean;  
  constructor(private accountService: AccountService, 
    private alertService: AlertService,
     private roleServiceService: RoleServiceService,
    private formBuilder: FormBuilder,
    private branchService: BranchService,
    private departmentService: DepartmentService
    ,private sectionService:SectionService,
    private router: Router,
    private employeeService:EmployeeService) { }
  registerForm: FormGroup;
  registerFormNew: FormGroup;
  submitted = false;
  userall: User[];
  userallBak: User[];
  roleall = null;
  listshow = true;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  
  ngOnInit() {
    this.listshow = true;
    this.loadingVisible = false;
    this.isEmp = false;
    this.getuser();
    this.getrole();
    this.empName = '';
    this.getEmployee();
    this.registerForm = this.formBuilder.group({
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      username: ['', Validators.required],
      employeeId: ['', Validators.required],
      roleId: ['', Validators.required],
    });


    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      processing: true,
      // destroy:true
    };
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    debugger;
    this.submitted = true;
    // stop here if form is invalid
    // if (this.registerForm.invalid) {
    //   return;
    // }


    if(!this.user){
      if (this.registerForm.invalid) {
        return;
      }

      this.accountService.register(this.registerForm.value).subscribe(result => {
       
        window.scroll(0, 0);
        location.reload();
      }, error => {
         
        this.alertService.error(error);
        location.reload();
        window.scroll(0, 0);
      });
    }
    else{
      
      this.accountService.updateUser(this.registerForm.value).subscribe(result => {
           
        this.alertService.success("Success Update");
        this.getuser();
        this.onReset();
          window.scroll(0, 0);
      }, error => {
         
        this.alertService.error("Not Update");
        window.scroll(0, 0);
      });
    }
    
    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }
  btnadd() {
    this.listshow = false;
    this.loadingVisible = false;
    this.registerForm.controls['employeeId'].patchValue("");
    this.registerForm.controls['roleId'].patchValue("");
  }
  btnEdit(user:User ){
     debugger;
    this.user=user;
    this.listshow=false;
    //this.loadingVisible = true;
  
    this.registerForm.addControl('id', new FormControl('', Validators.required));
    this.registerForm.controls['username'].patchValue(user.employeeName);
    this.registerForm.controls['employeeId'].patchValue(user.employeeId);
    this.registerForm.controls['Password'].patchValue(user.Password);
    this.registerForm.controls['ConfirmPassword'].patchValue(user.ConfirmPassword);
      //this.registerForm.controls['email'].patchValue(user.Password);
    this.registerForm.controls['roleId'].patchValue(user.roleId);
    this.listshow=false;
    this.loadingVisible = true;
  }
  getuser() {
    this.accountService.getAll().subscribe(result => {
       
      console.log(result);
      this.userall = result as User[];
      this.userallBak = this.userall;
      this.dtTrigger.next();
    }, error => {
      console.error(error)
      this.alertService.error(error);
      window.scroll(0, 0);
    });;
  }
  getrole() {
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
  
getBranch(){
   
    this.branchService.getAll().subscribe(result => {
       
        console.log(result);
        this.branchall = result as Branch[];
    }, error => {
      console.error(error)
      this.alertService.error(error);
      window.scroll(0, 0);
    });;
}
getDepartment(){
   
    this.departmentService.getAll().subscribe(result => {
       
        console.log(result);
        this.departmentall = result as Department[];
    }, error => {
      console.error(error)
      this.alertService.error(error);
      window.scroll(0, 0);
    });;
}
getSection(){
   
    this.sectionService.getAll().subscribe(result => {
       
        console.log(result);
        this.sectionall = result as Section[];
    }, error => {
      console.error(error)
      this.alertService.error(error);
      window.scroll(0, 0);
    });;
}
getEmployee(){
   
    this.employeeService.getAll().subscribe(result => {
       
        console.log(result);
        this.employeeall = result as Employee[];
    }, error => {
      console.error(error)
      this.alertService.error(error);
      window.scroll(0, 0);
    });;
}
onSelectBranch(branchId) {
  this.departmentallfilter = this.departmentall.filter((item) => item.branchId == branchId);
  this.sectionallfilter = this.sectionall.filter((item) => item.branchId == branchId);
}
onEmCheck(value){
   
this.isEmp=value;
if(value==true){ }
}
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
    this.listshow = true
  }
  getMenuByUser(UserId) {
    this.accountService.getusermenu(UserId).subscribe(result => {
       
      console.log(result);
      this.menuslist = result as Menus[];
    }, error => {
      console.error(error)
      this.alertService.error(error);
      window.scroll(0, 0);
    });;
  }
  routetousermenu(aspuserId){
     ;
    localStorage.setItem('aspuserId',JSON.stringify(aspuserId));
    this.router.navigateByUrl(`/pages/account/usermenu`);
  }
  btnDelete(Id:string){
    
    alert("Not Allowed");
    return;

    this.accountService.deleteUser(Id,'').subscribe(result => {
       
      window.scroll(0, 0);
      this.alertService.success("Success Delete");
      this.getrole();
    }, error => {
       
      this.alertService.error(error);
      window.scroll(0, 0);
    });
  }


  onKeyUp(data){
    debugger
        
        // for (let index = 0; index < this.userall.length; index++) {
        //   index["employeeName"] = data;
          
        // }

        let obj = this.userall.find(o=>o.employeeName===data)

        let data3 = "aa"
     
  }
  searchData(){
    debugger
     let userInp = this.empName;
     //this.userallBak = this.userall;
      // var foundItem = this.userall.find(o=>o.employeeName===userInp)
      // if(foundItem==undefined)
      // {
      //   foundItem = this.userall.find(o=>o.email.toLowerCase()===userInp)
      // }
      // if(foundItem==undefined){
      //   foundItem = this.userall.find(o=>o.username===userInp)
      // }
      userInp = userInp.toLowerCase();
      var data = this.userall.filter(o=>o.employeeName.toLowerCase().includes(userInp))

      this.userall = []
      this.userall = data

  }
  clearSearch(){
    this.userall = []
    this.empName = ''
    this.userallBak.forEach(element => {
      this.userall.push(element)
    });
    
    //this.userall = this.userallBak;
  }
  onEnterSearch(){
    debugger
     let userInp = this.empName;
     userInp = userInp.toLowerCase();
      var data = this.userall.filter(o=>o.employeeName.toLowerCase().includes(userInp))

      this.userall = []
      this.userall = data
  }
}
