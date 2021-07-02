import { Component, ViewChild, Input, ContentChildren, QueryList, forwardRef
} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle} from '@angular/cdk/drag-drop';
import {MatTable} from '@angular/material/table';
import { Sort } from '@angular/material/sort';

export interface IHeaders {
  id: string | number;
  name: string;
  age: number | string;
  gender: string;
  country: string;
}

@Component({
  selector: 'app-tabledragdrop',
  templateUrl: './tabledragdrop.component.html',
  styleUrls: ['./tabledragdrop.component.css']
})
export class TabledragdropComponent {
  @ViewChild('table') table: MatTable<IHeaders>;

  displayedColumns: string[] = ['id', 'name', 'age', 'gender', 'country'];
  dataSource:IHeaders[] = [
    {
      id: '1',
      name: 'John',
      age: '21',
      gender: 'Male',
      country: 'UK'
    },
    {
      id: '2',
      name: 'Robin',
      age: '25',
      gender: 'Male',
      country: 'London'
    },
    {
      id: '3',
      name: 'Robert',
      age: '12',
      gender: 'Male',
      country: 'Dubai'
    },
    {
      id: '4',
      name: 'Neeraj',
      age: '23',
      gender: 'Male',
      country: 'India'
    },
    {
      id: '5',
      name: 'Wiliiams',
      age: '30',
      gender: 'Male',
      country: 'Ausralia'
    },
    {
      id: '6',
      name: 'ChinZee',
      age: '25',
      gender: 'Female',
      country: 'China'
    },
    {
      id: '7',
      name: 'Renee',
      age: '12',
      gender: 'Female',
      country: 'Canada'
    }   
  ];
 
 dropTable(event: CdkDragDrop<IHeaders[]>) {
  const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
  console.log(event);
  const itemId = event.item.data.id;
  moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
  this.table.renderRows();
  console.log("Item Id:" + itemId + ", Prev Index:" + prevIndex + ", CurrentIndex" + event.currentIndex);
 }

 sortData(sort: Sort) {
   const data = this.dataSource.slice();
   if (!sort.active || sort.direction === '') {
     console.log("!sort.active");
     this.dataSource = data;
   } else {
     this.dataSource = data.sort((a, b) => {
       const aValue = (a as any)[sort.active];
       const bValue = (b as any)[sort.active];
       return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
     });
   }
   console.log(sort);
 }
}
