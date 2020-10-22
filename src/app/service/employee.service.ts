import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Employee } from '../Model/employee.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private collectionName: string;
  constructor(
    // private db: AngularFireDatabase,
    private db: AngularFirestore
    ) {
    this.collectionName = 'Employee';
   }

   public createEployee(empDetail: Employee) {
    return this.db.collection(this.collectionName).add(empDetail);
  }

  public getEmployees() {
    return this.db.collection(this.collectionName).snapshotChanges();
  }

  public EditEployee(employeeId: any) {
    return this.db.doc(this.collectionName + '/' + employeeId).snapshotChanges();
  }


  public updateEployee(employeeId: any, empDetail: Employee) {
    return this.db.doc(this.collectionName + '/' + employeeId).update(empDetail);
  }

  public deleteEployee(employeeId: any) {
    return this.db.doc(this.collectionName + '/' + employeeId).delete();
  }
}
