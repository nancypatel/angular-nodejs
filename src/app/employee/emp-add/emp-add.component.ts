import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { map } from 'rxjs/operators';
import { Employee } from 'src/app/Model/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-emp-add',
  templateUrl: './emp-add.component.html',
  styleUrls: ['./emp-add.component.styl']
})
export class EmpAddComponent implements OnInit {

  @Input() empDetail: any;
  EmployeeForm: FormGroup;
  Employee: Employee = new Employee();
  submitted = false;
  public data: any;
  public submitButton: string;
  public id: any;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private activeroute: ActivatedRoute,
    private fb: FormBuilder
  ) { 
    this.id = this.activeroute.snapshot.params.id;
    this.submitButton = 'submit';
    if(this.id)
    {
      this.submitButton = 'update';
    }
  }

  ngOnInit(): void {
    const key = Math.floor(Math.random() * 5);
    this.EmployeeForm = this.fb.group({
      $key: [key, [Validators.required]],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.maxLength(10)]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]]
    });
    if (this.id)
    {
      this.employeeService.EditEployee(this.id).subscribe((data) => {
        if (data){
         this.EmployeeForm.patchValue(data);
        }
      });
    }
  }

  get S() { return this.EmployeeForm.controls; }

  public Update() {
    if(this.id)
    {
      this.employeeService.updateEployee(this.id, this.EmployeeForm.value).then(res => {
        this.EmployeeForm.reset();
        // this.closeModal();
        console.log('Update');
      }).catch(error => console.log(error));
      this.router.navigate(['Employee']);
    }
    else
    {
      this.employeeService.createEployee(this.EmployeeForm.value).then(res => {
        this.EmployeeForm.reset();
        // this.closeModal();
        console.log('Add');
      }).catch(error => console.log(error));
      this.router.navigate(['Employee']);
    }
  }

}
