import { Component, inject } from '@angular/core';
import { Employee } from '../../model/employee.model';
import { EmployeeService } from '../../service/employee.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css',
})
export class EmployeeDetailsComponent {
  employee: Employee | null = null;
  employeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.employeeService.selectedEmployee$.subscribe((employee) => {
      this.employee = employee;
    });
  }
  toggleFlag() {
    if (!this.employee) return;

    if (this.employee.isFlagged) {
      this.employeeService.unflagEmployee(this.employee);
    } else {
      this.employeeService.flagEmployee(this.employee);
    }
  }
}
