import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import  { BooksComponent } from '../books/component/books.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BooksDialogComponent } from './books-dialog/books-dialog.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { BooksViewsDialogComponent } from './books-views-dialog/books-views-dialog.component';


@NgModule({
  declarations: [
    BooksComponent,
    BooksDialogComponent,
    BooksViewsDialogComponent,
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    LayoutModule
  ]
})
export class BooksModule { }
