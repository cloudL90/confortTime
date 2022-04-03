import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMovieModel } from '../models/movies.model';

@Component({
  selector: 'comforTime-movies-views-dialog',
  templateUrl: './movies-views-dialog.component.html',
  styleUrls: ['./movies-views-dialog.component.scss']
})
export class MoviesViewsDialogComponent implements OnInit {

  @Input() movie: IMovieModel;
  isReadMore: boolean = true;


  constructor() { }

  ngOnInit(): void {
  }

  showText() {
    this.isReadMore = !this.isReadMore
  }

}
