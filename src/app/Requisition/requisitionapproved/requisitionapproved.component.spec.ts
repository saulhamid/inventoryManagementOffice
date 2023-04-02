import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionapprovedComponent } from './requisitionapproved.component';

describe('IndentapprovedComponent', () => {
  let component: RequisitionapprovedComponent;
  let fixture: ComponentFixture<RequisitionapprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionapprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionapprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
