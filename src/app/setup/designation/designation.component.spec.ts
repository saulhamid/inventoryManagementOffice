import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { designationComponent } from './designation.component';

describe('BranchComponent', () => {
  let component: designationComponent;
  let fixture: ComponentFixture<designationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ designationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(designationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
