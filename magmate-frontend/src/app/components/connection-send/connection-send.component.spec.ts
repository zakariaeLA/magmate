import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionSendComponent } from './connection-send.component';

describe('ConnectionSendComponent', () => {
  let component: ConnectionSendComponent;
  let fixture: ComponentFixture<ConnectionSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnectionSendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectionSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
