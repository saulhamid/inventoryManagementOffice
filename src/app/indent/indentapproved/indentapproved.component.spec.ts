import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentapprovedComponent } from './indentapproved.component';

describe('IndentapprovedComponent', () => {
  let component: IndentapprovedComponent;
  let fixture: ComponentFixture<IndentapprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndentapprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentapprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
