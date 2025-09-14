import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrips } from './edit-trips';

describe('EditTrips', () => {
  let component: EditTrips;
  let fixture: ComponentFixture<EditTrips>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTrips]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTrips);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
