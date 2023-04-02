import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseqaComponent } from './purchaseqa.component';

describe('PurchaseqaComponent', () => {
  let component: PurchaseqaComponent;
  let fixture: ComponentFixture<PurchaseqaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseqaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseqaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
