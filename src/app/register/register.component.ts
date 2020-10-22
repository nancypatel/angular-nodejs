import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../Model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.styl']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userservice: UserService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', [Validators.required]],
      active: ['', [Validators.required]]
      // alternateEmails: this.fb.array([])
    });
  }

  get f() { return this.registerForm.controls; }

  public goLogin()
  {
    this.router.navigate(['login']);
  }

  public save(){
    this.userservice.Add(this.registerForm.value).subscribe((data: User) => {
      this.submitted = true;
      if (this.registerForm.invalid){
        return;
      }
      alert ('Register data added succesfully');
      this.router.navigate(['login']);
    });
  }


}
