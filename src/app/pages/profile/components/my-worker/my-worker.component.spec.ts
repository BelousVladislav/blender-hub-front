import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWorkerComponent } from './my-worker.component';

describe('MyWorkerComponent', () => {
  let component: MyWorkerComponent;
  let fixture: ComponentFixture<MyWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyWorkerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
