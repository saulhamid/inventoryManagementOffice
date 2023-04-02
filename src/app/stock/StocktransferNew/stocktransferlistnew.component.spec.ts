import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { stocktransferlistnewComponent } from './stocktransferlistnew.component';

describe('stocktransferlistComponent', () => {
  let component: stocktransferlistnewComponent;
  let fixture: ComponentFixture<stocktransferlistnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ stocktransferlistnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(stocktransferlistnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
