import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListComponent } from './employee-list.component';
import { mockEmployees } from '../../testing/mock.employee';
import { EmployeeService } from '../../service/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;

  let mockEmployeeService = jasmine.createSpyObj(
    'EmployeeService',
    ['getEmployeeList', 'selectEmployee'],
    { employees$: of(mockEmployees), selectedEmployee$: of(null) }
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeListComponent, HttpClientModule],
      providers: [{ provide: EmployeeService, useValue: mockEmployeeService }],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    mockEmployeeService.getEmployeeList.and.returnValue(of(mockEmployees));
  });

  it('should create EmployeeListComponent with default values', () => {
    expect(component).toBeTruthy();
    expect(component.loading).toBe(true);
    expect(component.selectedEmployee).toBeNull();
    expect(component.employees.length).toBe(0);
  });

  it('should fetch employees', () => {
    component.ngOnInit();
    expect(mockEmployeeService.getEmployeeList).toHaveBeenCalled();
    expect(component.employees$).toBe(mockEmployeeService.employees$);
  });

  it('should set loading to false after employees$ emits values', () => {
    component.ngOnInit();
    expect(component.loading).toBe(false);
  });

  it('should set loading to false when employees$ emits error', () => {
    const errorObs = throwError(() => new Error('Test error'));
    mockEmployeeService.getEmployeeList.and.returnValue(errorObs);
    component.ngOnInit();
    expect(component.loading).toBe(false);
  });

  it('should call service.selectEmployee when selectEmployee is called', () => {
    const employee = mockEmployees[0];
    component.selectEmployee(employee);
    expect(mockEmployeeService.selectEmployee).toHaveBeenCalledWith(employee);
  });

  it('should update selectedEmployee when selectedEmployee$ emits', () => {
    const selectedEmployee = mockEmployees[0];
    const selectedEmployee$ = of(selectedEmployee);
    Object.defineProperty(mockEmployeeService, 'selectedEmployee$', {
      get: () => selectedEmployee$,
    });

    component.ngOnInit();
    expect(component.selectedEmployee).toEqual(selectedEmployee);
  });
});
