import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierproductComponent } from './supplierproduct.component';

describe('SupplierproductComponent', () => {
  let component: SupplierproductComponent;
  let fixture: ComponentFixture<SupplierproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
