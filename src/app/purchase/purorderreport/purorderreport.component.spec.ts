import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurorderreportComponent } from './purorderreport.component';

describe('PurorderreportComponent', () => {
  let component: PurorderreportComponent;
  let fixture: ComponentFixture<PurorderreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurorderreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurorderreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
