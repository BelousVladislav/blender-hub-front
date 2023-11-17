import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowBecomeClientComponent } from './how-become-client.component';

describe('HowBecomeClientComponent', () => {
  let component: HowBecomeClientComponent;
  let fixture: ComponentFixture<HowBecomeClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowBecomeClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowBecomeClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
