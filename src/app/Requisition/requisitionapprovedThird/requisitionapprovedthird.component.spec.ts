import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionapprovedthirdComponent } from './requisitionapprovedthird.component';

describe('IndentapprovedComponent', () => {
  let component: RequisitionapprovedthirdComponent;
  let fixture: ComponentFixture<RequisitionapprovedthirdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionapprovedthirdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionapprovedthirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
