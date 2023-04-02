import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { stocktransferapprovedComponent } from './stocktransferapproved.component';

describe('IndentapprovedComponent', () => {
  let component: stocktransferapprovedComponent;
  let fixture: ComponentFixture<stocktransferapprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ stocktransferapprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(stocktransferapprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
