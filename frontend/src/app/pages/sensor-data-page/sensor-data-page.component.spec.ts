import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorDataPageComponent } from './sensor-data-page.component';

describe('SensorDataPageComponent', () => {
  let component: SensorDataPageComponent;
  let fixture: ComponentFixture<SensorDataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorDataPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
