import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaereturnlistComponent } from './purchaereturnlist.component';

describe('PurchaereturnlistComponent', () => {
  let component: PurchaereturnlistComponent;
  let fixture: ComponentFixture<PurchaereturnlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaereturnlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaereturnlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
