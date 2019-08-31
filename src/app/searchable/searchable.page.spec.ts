import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchablePage } from './searchable.page';

describe('SearchablePage', () => {
  let component: SearchablePage;
  let fixture: ComponentFixture<SearchablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchablePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
