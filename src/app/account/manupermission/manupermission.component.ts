import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { strict } from 'assert';
import { User } from '../../_models';
import { Menus } from '../../_models/menus';
import { AccountService, AlertService } from '../../_services';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { IActionMapping, ITreeOptions } from '@circlon/angular-tree-component';

@Component({ templateUrl: 'manupermission.component.html' })

export class ManupermissionComponent implements OnInit {
    constructor(
        private accountService: AccountService,
        private alertService: AlertService,
        private activatedRoute: ActivatedRoute
    ) { }
    menuall: Menus[];
    userId:string;
    user :User;

    ngOnInit() {
 
        
      this.user=JSON.parse(localStorage.getItem('aspuserId')) as User;
      this.getUserMenu(this.user.aspuserId)
    }

    getUserMenu(userId:string){
      debugger
          this.accountService.getusermenu(userId).subscribe(result => {
              console.log(result);
              this.menuall = result as Menus[];
              
          }, error => {
            console.error(error)
            this.alertService.error(error);
            window.scroll(0, 0);
          });
      }
      checked = false;
      toggle(checked: boolean,menu:Menus) {
        this.checked = checked;
        menu.isPermission=this.checked;
        if(menu.menuParentId==0){
          menu.children.forEach(obj => {
          obj.isPermission=checked;
        });
      }
      }

      SaveuserMenu(){
        console.log(this.nodes)
        // stop here if form is invalid
        debugger
    this.accountService.Saveusermenu(this.menuall).subscribe(result => {
       
      window.scroll(0, 0);
      this.alertService.success("Success Insert");
      this.getUserMenu(this.user.aspuserId);
    }, error => {
       
      this.alertService.error(error);
      window.scroll(0, 0);
    });
  }

  nodes = [
    {
      title: 'root1',
      IsPermission: true,
    },
    {
      title: 'root2',
      IsPermission: false,
      children: [
        { title: 'child1', IsPermission: false },
        { title: 'child2', IsPermission: false, children: [
          { title: 'grandchild1', IsPermission: false },
          { title: 'grandchild2', IsPermission: false }
        ] }
      ]
    }
  ];

  actionMapping: IActionMapping = {
    mouse: {
      click: (tree, node) => this.check(node, !node.data.isPermission)
    }
  };

  options: ITreeOptions = {
    actionMapping: this.actionMapping
  };

  public check(node, checked) {
    this.updateChildNodeCheckbox(node, checked);
    this.updateParentNodeCheckbox(node.realParent);
  }
  public updateChildNodeCheckbox(node, checked) {
    node.data.isPermission = checked;

    if (node.children) {
      node.children.forEach((child) => this.updateChildNodeCheckbox(child, checked));
    }
  }
  public updateParentNodeCheckbox(node) {
    if (!node) {
      return;
    }

    let allChildrenChecked = true;
    let noChildChecked = true;

    for (const child of node.children) {
      if (!child.data.isPermission ) {
        allChildrenChecked = false;
      }
      if (child.data.IsPermission) {
        noChildChecked = false;
      }
    }

    if (allChildrenChecked) {
      node.data.isPermission = true;

    } else if (noChildChecked) {
      node.data.isPermission = false;

    } else {
      node.data.isPermission = true;
    }
    this.updateParentNodeCheckbox(node.parent);
  }
}