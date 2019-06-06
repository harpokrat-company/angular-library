import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {HttpClientModule} from '@angular/common/http';

const URL = 'https://api.harpokrat.com/v1';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [{
      provide: 'serverUrl',
      useValue: URL
    }]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should have the correct uri', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service.baseUri).toEqual(`${URL}/users`);
  });

  // it('should create a user', () => {
  //   const service: UserService = TestBed.get(UserService);
  //   const email = 'test@test.test';
  //   const firstName = 'TestFname';
  //   const lastName = 'TestLname';
  //   const password = 'Testpassword+123';
  //   service.create({
  //     email, firstName, lastName, password
  //   }).subscribe(resource => {
  //     expect(resource.attributes.email).toEqual(email);
  //     expect(resource.attributes.firstName).toEqual(firstName);
  //     expect(resource.attributes.lastName).toEqual(lastName);
  //   });
  // });
});

