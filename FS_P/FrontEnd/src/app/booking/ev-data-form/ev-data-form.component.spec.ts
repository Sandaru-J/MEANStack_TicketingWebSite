import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvDataFormComponent } from './ev-data-form.component';

describe('EvDataFormComponent', () => {
  let component: EvDataFormComponent;
  let fixture: ComponentFixture<EvDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvDataFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
