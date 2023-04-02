import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { stocktransferlistComponent } from './stocktransferlist.component';

describe('stocktransferlistComponent', () => {
  let component: stocktransferlistComponent;
  let fixture: ComponentFixture<stocktransferlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ stocktransferlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(stocktransferlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
