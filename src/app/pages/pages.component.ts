import { Component } from '@angular/core';
import { User } from '../_models';
import { Menus } from '../_models/menus';
import { AccountService, AlertService } from '../_services';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  constructor(private accountService: AccountService,private alertService: AlertService) { 
    this.ngOnInit();
    this.getMenus();
  }
  menu;
  user:User;
  //menu=MENU_ITEMS;
  ngOnInit() {
    this.menu=null;
    this.user=JSON.parse(localStorage.getItem("UserDetail")) as User;
  }
  getMenus(){
      this.accountService.getAllMenus(this.user.id).subscribe(result => {
          console.log(result);

          this.menu= result as Menus[];
      }, error => {
        console.error(error)
        this.alertService.error(error);
        window.scroll(0, 0);
      });;
  }
 

}
