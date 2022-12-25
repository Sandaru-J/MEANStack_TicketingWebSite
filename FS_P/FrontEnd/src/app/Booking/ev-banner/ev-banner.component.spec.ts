import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvBannerComponent } from './ev-banner.component';

describe('EvBannerComponent', () => {
  let component: EvBannerComponent;
  let fixture: ComponentFixture<EvBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
