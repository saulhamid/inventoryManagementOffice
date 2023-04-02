import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasearrivedComponent } from './purchasearrived.component';

describe('PurchasearrivedComponent', () => {
  let component: PurchasearrivedComponent;
  let fixture: ComponentFixture<PurchasearrivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasearrivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasearrivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
