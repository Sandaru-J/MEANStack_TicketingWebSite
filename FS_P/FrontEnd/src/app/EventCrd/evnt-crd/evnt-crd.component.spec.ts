import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvntCrdComponent } from './evnt-crd.component';

describe('EvntCrdComponent', () => {
  let component: EvntCrdComponent;
  let fixture: ComponentFixture<EvntCrdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvntCrdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvntCrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
