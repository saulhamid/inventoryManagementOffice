import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StockIssueapprovedComponent } from './stockIssueapproved.component';



describe('IndentapprovedComponent', () => {
  let component: StockIssueapprovedComponent;
  let fixture: ComponentFixture<StockIssueapprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockIssueapprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockIssueapprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
