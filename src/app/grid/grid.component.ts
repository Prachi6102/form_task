import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  rowData: any[] = [];

  colDefs: ColDef[] = [
    { field: 'fname' },
    { field: 'lname' },
    { field: 'email' },
    { field: 'mobile' },
    { field: 'dob' },
    { field: 'address.country', headerName: 'Country' },
    { field: 'address.state', headerName: 'State' },
    { field: 'address.city', headerName: 'City' },
    { field: 'address.street', headerName: 'Street' },
    { field: 'address.postal', headerName: 'Postal' },
    { field: 'gender' },
  ];

  constructor() {}

  ngOnInit() {
    console.log('in grid');
    // Retrieve form data array from local storage
    const formDataArray = JSON.parse(localStorage.getItem('formDataArray'));
    if (formDataArray) {
      this.rowData = formDataArray;
    }
  }
}
