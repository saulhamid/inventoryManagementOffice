import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalsetupComponent } from './globalsetup.component';

describe('GlobalsetupComponent', () => {
  let component: GlobalsetupComponent;
  let fixture: ComponentFixture<GlobalsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalsetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
