import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBashboardComponent } from './product-bashboard.component';

describe('ProductBashboardComponent', () => {
  let component: ProductBashboardComponent;
  let fixture: ComponentFixture<ProductBashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductBashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
