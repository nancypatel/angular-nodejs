import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.styl']
})
export class ProductComponent implements OnInit {

  title = 'Angular8Firebase';
  description = 'Angular-Fire-Demo';
 
  itemValue = '';
  items: Observable<any[]>;
 
  constructor(public db: AngularFireDatabase) {
    this.items = db.list('items').valueChanges();
   }

  ngOnInit(): void {
  }

   onSubmit() {
    this.db.list('items').push({ content: this.itemValue});
    this.itemValue = '';
  }

}
