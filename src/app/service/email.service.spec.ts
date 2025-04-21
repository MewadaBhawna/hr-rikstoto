import { TestBed } from '@angular/core/testing';

import { EmailService } from './email.service';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { mockEmployees } from '../testing/mock.employee';
import { EmailPayload } from '../model/email.model';
import { environment } from '../../environments/environment';

describe('EmailService', () => {
  let service: EmailService;
  let mockHttp: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(EmailService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send mail', () => {
    const employee = mockEmployees[0];

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

    const req = mockHttp.expectOne(environment.emailApiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);

    req.flush(null);
  });
});
