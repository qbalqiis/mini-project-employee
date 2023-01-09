import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.css']
})
export class DetailEmployeeComponent {
  data: any= this.router.getCurrentNavigation()?.extras.state
  constructor(private router: Router) {
  }

}
