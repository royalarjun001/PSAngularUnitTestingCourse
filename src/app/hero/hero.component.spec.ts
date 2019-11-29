import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeroComponent', () => {
  let fixture: ComponentFixture<HeroComponent>;
  beforeEach(() => {
    // what: we are creating module for testing
    // why : In unit testing we should always test one unit
    //       at a time. But in most of the actual projects
    //       has larger size of module and has many number
    //       of component, to test only our component we create
    //       temporary module for testing using testBed.
    TestBed.configureTestingModule({
      declarations: [HeroComponent],

      // this will tell angular to do not cause issue
      // if you encounter unknown attribute or directive
      schemas: [NO_ERRORS_SCHEMA]
    });

    // what: we are telling to use module created at above
    //       and create our component here.
    fixture = TestBed.createComponent(HeroComponent);
  });

  it('should have the correct hero', () => {
    fixture.componentInstance.hero = {id: 1, name: 'super dude', strength: 3};
    expect(fixture.componentInstance.hero.name).toEqual('super dude');
  });
});
