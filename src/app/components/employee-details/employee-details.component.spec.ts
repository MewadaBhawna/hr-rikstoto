import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailsComponent } from './employee-details.component';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { EmployeeService } from '../../service/employee.service';
import { mockEmployees } from '../../testing/mock.employee';
import { Employee } from '../../model/employee.model';

describe('EmployeeDetailsComponent', () => {
  let component: EmployeeDetailsComponent;
  let fixture: ComponentFixture<EmployeeDetailsComponent>;

  let mockEmployeeService = jasmine.createSpyObj(
    'EmployeeService',
    ['unflagEmployee', 'flagEmployee'],
    { selectedEmployee$: of(null) }
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDetailsComponent, HttpClientModule],
      providers: [{ provide: EmployeeService, useValue: mockEmployeeService }],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.employee).toBeNull;
  });

  it('should set employee to null when selectedEmployee$ emits null', () => {
    const selectedEmployee = of(null);
    Object.defineProperty(mockEmployeeService, 'selectedEmployee$', {
      get: () => selectedEmployee,
    });
    component.ngOnInit();
    expect(component.employee).toBeNull;
  });

  it('should update employee when selectedEmployee$ emits value', () => {
    const selectedEmployee = of(mockEmployees[0]);
    Object.defineProperty(mockEmployeeService, 'selectedEmployee$', {
      get: () => selectedEmployee,
    });
    component.ngOnInit();
    expect(component.employee).toEqual(mockEmployees[0]);
  });

  it('should call not any service method when toggle function with no employee', () => {
    component.employee = null;
    component.toggleFlag();
    expect(mockEmployeeService.flagEmployee).not.toHaveBeenCalled();
    expect(mockEmployeeService.unflagEmployee).not.toHaveBeenCalled();
  });

  it('should call service.flagEmployee when toggleFlag called on flag ', () => {
    const selectedEmployee: Employee = {
      ...mockEmployees[0],
      isFlagged: false,
    };
    component.employee = selectedEmployee;
    component.toggleFlag();

    expect(mockEmployeeService.flagEmployee).toHaveBeenCalledWith(
      selectedEmployee
    );
  });

  it('should call unflagEmployee when toggleFlag called on flagged ', () => {
    const selectedEmployee: Employee = {
      ...mockEmployees[0],
      isFlagged: true,
    };
    component.employee = selectedEmployee;
    component.toggleFlag();

    expect(mockEmployeeService.unflagEmployee).toHaveBeenCalledWith(
      selectedEmployee
    );
  });
});
