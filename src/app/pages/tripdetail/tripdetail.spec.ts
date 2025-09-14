import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tripdetail } from './tripdetail';

describe('Tripdetail', () => {
  let component: Tripdetail;
  let fixture: ComponentFixture<Tripdetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tripdetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tripdetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
