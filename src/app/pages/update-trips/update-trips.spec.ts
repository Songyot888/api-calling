import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTrips } from './update-trips';

describe('UpdateTrips', () => {
  let component: UpdateTrips;
  let fixture: ComponentFixture<UpdateTrips>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTrips]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTrips);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
