import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridComponent } from './grid/grid.component';
import { AgGridAngular } from 'ag-grid-angular';

@NgModule({
  declarations: [AppComponent, FormComponent, GridComponent],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule, AgGridAngular],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
