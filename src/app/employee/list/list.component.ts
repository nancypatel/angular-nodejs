import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { Employee } from 'src/app/Model/employee.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl']
})
export class ListComponent implements OnInit {

  public Employe: Employee[];
  constructor
  (
    private employeeService: EmployeeService,
    private router: Router
  )
  {
    this.Employe = [];
  }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.Employe = [];
      if (data)
      {
        this.Employe = data.map(e => {
          return {
            $key: e.payload.doc.id,
            name: e.payload.doc.data()['name'],
            lastname: e.payload.doc.data()['lastname'],
            mobile: e.payload.doc.data()['mobile'],
            address: e.payload.doc.data()['address'],
            city: e.payload.doc.data()['city'],
          };
        });
      }
    });
  }

  public editEmp(id: any) {
    this.employeeService.EditEployee(id).subscribe((data) => {
      if(data){
        console.log(id);
        this.router.navigate([`EditEmployee/${id}`]);
      }
    });
  }

  public deleteEmp(empId: any) {
    console.log(empId);
    this.employeeService.deleteEployee(empId).then(res => {
      console.log('Delete');
    }).catch(error => console.log(error));
  }
}
