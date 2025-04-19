import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../model/employee.model';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<{ results: any }>(environment.apiUrl).pipe(
      map((data) => {
        const employees = data.results.map((user: any) => ({
          id: user.login.uuid,
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

        return employees;
      }),
      catchError((error) => {
        console.error('Error loading employees data:', error);
        return of([]);
      })
    );
  }
}
