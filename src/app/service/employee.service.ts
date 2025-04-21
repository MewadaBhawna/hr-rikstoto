import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../model/employee.model';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private selectedEmployeeSubject = new BehaviorSubject<Employee | null>(null);
  selectedEmployee$ = this.selectedEmployeeSubject.asObservable();

  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  employees$ = this.employeesSubject.asObservable();

  constructor(private http: HttpClient, private email: EmailService) {}

  /**
   * Fetches the list of employees,
   * tranformes the response in employee interface,
   * store value in employeesSubject for sharing
   * @returns
   */
  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<{ results: any }>(environment.apiUrl).pipe(
      map((data) => {
        const employees = data.results.map((user: any) => ({
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

        this.employeesSubject.next(employees);
        return employees;
      }),
      catchError((error) => {
        console.error('Error loading employees data:', error);
        return of([]);
      })
    );
  }
  /**
   * Keep track of selected employee from the employee list
   * @param employee
   */
  selectEmployee(employee: Employee): void {
    this.selectedEmployeeSubject.next(employee);
  }

  /**
   * Unflags the specified employee by updating their `isFlagged` property to true.
   * send mail using service
   * @param employee
   */
  flagEmployee(employee: Employee): void {
    const employees = this.employeesSubject.value;
    const index = employees.findIndex((e) => e.id === employee.id);

    if (index !== -1) {
      const updatedEmployees = [...employees];
      updatedEmployees[index] = {
        ...updatedEmployees[index],
        isFlagged: true,
      };
      this.employeesSubject.next(updatedEmployees);
      this.selectedEmployeeSubject.next(updatedEmployees[index]);
    }

    this.email.sendEmail(employee).subscribe({
      error: (err) => console.error('Failed to send flag notification:', err),
    });
  }

  /**
   * Unflags the specified employee by updating their `isFlagged` property to false.
   * @param employee
   */
  unflagEmployee(employee: Employee): void {
    const employees = this.employeesSubject.value;
    const index = employees.findIndex((e) => e.id === employee.id);
    if (index !== -1) {
      const updatedEmployees = [...employees];
      updatedEmployees[index] = {
        ...updatedEmployees[index],
        isFlagged: false,
      };

      this.employeesSubject.next(updatedEmployees);
      this.selectedEmployeeSubject.next(updatedEmployees[index]);
    }
  }
}
