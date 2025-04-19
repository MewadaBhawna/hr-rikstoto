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

  ngOnInit(): void {
    this.loading = true;
    this.employees$ = this.employeeService.getEmployeeList();
    this.employees$.subscribe({
      next: () => (this.loading = false),
      error: () => (this.loading = false),
    });
  }
  /**
   *update selectEmployee subject
   * @param employee : selected employee from sidebar
   */
  selectEmployee(employee: Employee): void {
    this.employeeService.selectEmployee(employee);
  }
}
