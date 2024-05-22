import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceListDetailComponent } from './invoice-list-detail.component';

describe('InvoiceListDetailComponent', () => {
  let component: InvoiceListDetailComponent;
  let fixture: ComponentFixture<InvoiceListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceListDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
