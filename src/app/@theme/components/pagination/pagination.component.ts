import { Component, OnChanges, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ngx-pagination',
  styleUrls: ['./pagination.component.scss'],
  template: `
  <nav aria-label="page navigation example">  
  <ul class="pagination">  
    <li class="page-item"  (click)="onClickPage(activePage - 1)"><a class="page-link" href="javascript:void(0);">Previous</a></li>  
    <li class="page-item" [ngClass]="{'active': activePage === item}" *ngFor="let item of pages" (click)="onClickPage(item)"><a class="page-link" href="javascript:void(0);">{{item}}</a></li>  
    <li class="page-item" (click)="onClickPage(activePage + 1)"><a class="page-link" href="javascript:void(0);">Next</a></li>  
  </ul>  
</nav> 
  `,
})
export class PaginationComponent implements OnChanges{  
    @Input() totalRecords: number = 0;  
    @Input() recordsPerPage: number = 0;  
    @Input() pages: number [] = [];  
  
    @Output() onPageChange: EventEmitter<number> = new EventEmitter();  
  
    activePage:number;  
  
    ngOnChanges(){  
      const pageCount = this.getPageCount();  
      this.pages = this.getArrayOfPage(pageCount);  
      this.activePage = 1;  
      this.onPageChange.emit(1);  
    }  
  
    private  getPageCount(): number {  
      let totalPage:number = 0;  
        
      if(this.totalRecords > 0 && this.recordsPerPage > 0){  
        const pageCount = this.totalRecords / this.recordsPerPage;  
        const roundedPageCount = Math.floor(pageCount);  
  
        totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;  
      }  
  
      return totalPage;  
    }  
  
    private getArrayOfPage(pageCount : number) : number [] {  
      let pageArray : number [] = [];  
  
      if(pageCount > 0){  
          for(var i=1 ; i<= pageCount ; i++){  
            pageArray.push(i);  
          }  
      }  
  
      return pageArray;  
    }  
  
    onClickPage(pageNumber:number){  
        if(pageNumber < 1) return;
        if(pageNumber > this.pages.length) return;
        this.activePage = pageNumber;  
        this.onPageChange.emit(this.activePage);  
    }  
}  