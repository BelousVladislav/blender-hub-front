import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyFreeblenderComponent } from './why-freeblender.component';

describe('WhyFreeblenderComponent', () => {
  let component: WhyFreeblenderComponent;
  let fixture: ComponentFixture<WhyFreeblenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyFreeblenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyFreeblenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
