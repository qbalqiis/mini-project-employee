import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any
  pass: any

  // public model: ILogin = {email: "admin", password: "admin123"};

  // public loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    if (this.user == 'admin' && this.pass == '123') {
      alert("login suscces")
      this.router.navigate(['/dashboard'])
    } else {
      alert("login error")
    }
  }
}
