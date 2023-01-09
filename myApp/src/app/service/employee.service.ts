import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../model/employee";

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  baseUrl = "https://63b7d7914d97e82aa3c73340.mockapi.io/data-employee"
  constructor(private http: HttpClient) {
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  postEmployee(data: any) {
    return this.http.post<any>(this.baseUrl, data)
  }
  putEmployee(data: any, id : number) {
    return this.http.put<any>(`${this.baseUrl}/+{id}`, data)
  }
  deleteEmployee(id : number) {
    return this.http.delete<any>(`${this.baseUrl}/+{id}`)
  }
}
