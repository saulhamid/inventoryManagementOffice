import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { stocktransferreceiveComponent } from './stocktransferreceive.component';

describe('stocktransferreceiveComponent', () => {
  let component: stocktransferreceiveComponent;
  let fixture: ComponentFixture<stocktransferreceiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ stocktransferreceiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(stocktransferreceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
