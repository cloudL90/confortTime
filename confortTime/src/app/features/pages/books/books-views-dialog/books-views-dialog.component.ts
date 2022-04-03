import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IBookModel } from '../models/book.model';

@Component({
  selector: 'comforTime-books-views-dialog',
  templateUrl: './books-views-dialog.component.html',
  styleUrls: ['./books-views-dialog.component.scss']
})
export class BooksViewsDialogComponent implements OnInit {

  @Input() book: IBookModel;
  isReadMore: boolean = true;

  constructor() { }

  ngOnInit(): void {

    
    //console.log(this.book.title);
  }

  showText() {
    this.isReadMore = !this.isReadMore
  }

}
