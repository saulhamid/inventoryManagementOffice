import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurmentapproveComponent } from './procurmentapprove.component';

describe('ProcurmentapproveComponent', () => {
  let component: ProcurmentapproveComponent;
  let fixture: ComponentFixture<ProcurmentapproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurmentapproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurmentapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
