import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectItemSettingComponent } from './project-item-setting.component';

describe('ProjectItemSettingComponent', () => {
  let component: ProjectItemSettingComponent;
  let fixture: ComponentFixture<ProjectItemSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectItemSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectItemSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
