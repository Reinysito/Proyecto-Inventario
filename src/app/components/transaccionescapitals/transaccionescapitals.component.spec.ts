import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionescapitalsComponent } from './transaccionescapitals.component';

describe('TransaccionescapitalsComponent', () => {
  let component: TransaccionescapitalsComponent;
  let fixture: ComponentFixture<TransaccionescapitalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransaccionescapitalsComponent]
    });
    fixture = TestBed.createComponent(TransaccionescapitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
