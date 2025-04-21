import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { Employee } from '../../model/employee.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  employees$!: Observable<Employee[]>;
  employeeService = inject(EmployeeService);
  loading: boolean = true;
  selectedEmployee: Employee | null = null;
  employees: Employee[] = [];

  ngOnInit(): void {
    this.loading = true;
    //subscribed using async pipe
    this.employees$ = this.employeeService.getEmployeeList();
    this.employees$.subscribe({
      next: () => (this.loading = false),
      error: () => (this.loading = false),
    });

    this.employeeService.selectedEmployee$.subscribe((employee) => {
      this.selectedEmployee = employee;
    });

    this.employees$ = this.employeeService.employees$;
  }
  /**
   * keep select employee track
   * @param employee
   */
  selectEmployee(employee: Employee): void {
    this.employeeService.selectEmployee(employee);
  }
}
