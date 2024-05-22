import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rc6Component } from './rc6.component';

describe('Rc6Component', () => {
  let component: Rc6Component;
  let fixture: ComponentFixture<Rc6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Rc6Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rc6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
