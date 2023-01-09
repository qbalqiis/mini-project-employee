import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeService} from "../service/employee.service";
import {Router} from "@angular/router";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'EmployeeSystemCRUD';
  displayedColumns: string[] = ['userName', 'firstName', 'lastName', 'birthDate', 'email', 'group', 'status', 'salary', 'description', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private employee: EmployeeService, private router: Router) {
  }

  ngOnInit() {
    this.getAllEmployee();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%',
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllEmployee();
      }
    })
  }

  getAllEmployee() {
    this.employee.getEmployees().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // alert("Error while fetching the record!")
      }
    })
    this.getAllEmployee();
  }

  editEmployee(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllEmployee();
      }
    })
  }

  deleteProduct(id: number) {
    this.employee.deleteEmployee(id)
      .subscribe({
        next: (res) => {
          alert("Product Deleted Successfully")
        },
        error: () => {
          alert("Error while delete the data")
        }
      })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  detailEmployee(row: any) {
    this.router.navigate(['employee/detail'], {state: row});
    console.log("asjbdaoj")
  }

}
