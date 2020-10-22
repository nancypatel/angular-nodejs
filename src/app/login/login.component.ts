import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../Model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userservice: UserService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() { return this.loginForm.controls; }

  public save()
  {
    this.submitted = true;
    if (this.loginForm.invalid){
        return;
    }
    localStorage.setItem('token', 'syJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9');
    this.userservice.getbyLogin(this.f.email.value).subscribe((data: User) =>
    {
      if (data)
      {
        console.log(data);
        if (data[0].email === this.f.email.value && data[0].password === this.f.password.value)
        {
          localStorage.setItem('userPermision', 'true');
          localStorage.setItem('userId', data[0].id);
          console.log(data[0].id);
          // console.log(this.f.password.value);
          this.router.navigate(['home']);
          // this.profile();
        }
      }
      alert('name and password not match');
    });
  }
}
