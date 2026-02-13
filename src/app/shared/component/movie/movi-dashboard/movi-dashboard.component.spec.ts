import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviDashboardComponent } from './movi-dashboard.component';

describe('MoviDashboardComponent', () => {
  let component: MoviDashboardComponent;
  let fixture: ComponentFixture<MoviDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
