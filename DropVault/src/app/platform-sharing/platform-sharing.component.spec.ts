import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformSharingComponent } from './platform-sharing.component';

describe('PlatformSharingComponent', () => {
  let component: PlatformSharingComponent;
  let fixture: ComponentFixture<PlatformSharingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatformSharingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformSharingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
