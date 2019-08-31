import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Video1Page } from './video1.page';

describe('Video1Page', () => {
  let component: Video1Page;
  let fixture: ComponentFixture<Video1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Video1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Video1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
