import { Injectable } from '@angular/core';
import { Employee } from '../model/employee.model';
import { EmailPayload } from '../model/email.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}

  sendEmail(employee: Employee): Observable<void> {
    const payload: EmailPayload = {
      to: 'hr@example.com',
      from: 'hrDashboard@example.com',
      subject: `Employee Flagged: ${employee.name.first} ${employee.name.last}`,
      body: `
        The following employee has been flagged:

        Name: ${employee.name.title} ${employee.name.first} ${employee.name.last}
        Email: ${employee.email}
        Employee ID: ${employee.id}
      `,
    };

    return this.http.post<void>(environment.emailApiUrl, payload).pipe(
      catchError((error) => {
        console.error('Error sending flag notification email:', error);
        return throwError(() => new Error('Failed to send notification email'));
      })
    );
  }
}
