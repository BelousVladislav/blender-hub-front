import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowBecomeWorkerComponent } from './how-become-worker.component';

describe('HowBecomeWorkerComponent', () => {
  let component: HowBecomeWorkerComponent;
  let fixture: ComponentFixture<HowBecomeWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowBecomeWorkerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowBecomeWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
