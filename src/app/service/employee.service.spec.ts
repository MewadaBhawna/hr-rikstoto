import { flushMicrotasks, TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { mockEmployees } from '../testing/mock.employee';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let mockHttp: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(EmployeeService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get employee list', () => {
    service.getEmployeeList().subscribe((employees) => {
      expect(employees).toEqual(mockEmployees);
    });
  });
  it('should get employee list', () => {
    spyOn(service['employeesSubject'], 'next').and.callThrough();

    const mockRawUsers = mockEmployees.map((employee) => {
      const { isFlagged, ...rawUser } = employee;
      return rawUser;
    });
    const mockApiResponse = {
      results: mockRawUsers,
    };

    const expectedEmployees = mockApiResponse.results.map((user: any) => ({
      id: user.id.value,
      name: user.name,
      email: user.email,
      phone: user.phone,
      cell: user.cell,
      picture: user.picture,
      location: user.location,
      login: user.login,
      dob: user.dob,
      registered: user.registered,
      isFlagged: false,
    }));

    service.getEmployeeList().subscribe((employees) => {
      expect(employees.length).toEqual(expectedEmployees.length);
    });

    const req = mockHttp.expectOne(environment.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);

    expect(service['employeesSubject'].next).toHaveBeenCalledWith(
      expectedEmployees
    );
  });

  it('should handle errors when the API returns an error', () => {
    service.getEmployeeList().subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.message).toContain('Error loading employees data:');
      },
    });

    const req = mockHttp.expectOne(environment.apiUrl);

    req.flush('Server error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });

  it('should update selectedEmployeeSubject on select Employee ', () => {
    spyOn(service['selectedEmployeeSubject'], 'next').and.callThrough();
    const mockEmployee = mockEmployees[0];

    service.selectEmployee(mockEmployee);

    expect(service['selectedEmployeeSubject'].next).toHaveBeenCalledWith(
      mockEmployee
    );
  });

  it('should update flag on unflagEmployee ', () => {
    spyOn(service['selectedEmployeeSubject'], 'next').and.callThrough();
    spyOn(service['employeesSubject'], 'next').and.callThrough();

    const mockEmployee = { ...mockEmployees[0], isFlagged: true };
    service['employeesSubject'].next([mockEmployee, mockEmployees[1]]);

    service.unflagEmployee(mockEmployee);

    expect(service['selectedEmployeeSubject'].next).toHaveBeenCalledWith({
      ...mockEmployees[0],
      isFlagged: false,
    });
    expect(service['employeesSubject'].next).toHaveBeenCalledWith([
      {
        ...mockEmployees[0],
        isFlagged: false,
      },
      mockEmployees[1],
    ]);
  });

  it('should update flag on flagEmployee ', () => {
    spyOn(service['selectedEmployeeSubject'], 'next').and.callThrough();
    spyOn(service['employeesSubject'], 'next').and.callThrough();

    const mockEmployee = { ...mockEmployees[0], isFlagged: false };
    service['employeesSubject'].next([mockEmployee, mockEmployees[1]]);

    service.flagEmployee(mockEmployee);

    expect(service['selectedEmployeeSubject'].next).toHaveBeenCalledWith({
      ...mockEmployees[0],
      isFlagged: true,
    });
    expect(service['employeesSubject'].next).toHaveBeenCalledWith([
      {
        ...mockEmployees[0],
        isFlagged: true,
      },
      mockEmployees[1],
    ]);
  });
});
