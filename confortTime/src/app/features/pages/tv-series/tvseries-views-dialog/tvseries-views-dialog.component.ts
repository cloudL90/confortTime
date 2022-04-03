import { Component, Input, OnInit } from '@angular/core';
import { ITvSeriesModel } from '../models/tvSeries.model';

@Component({
  selector: 'comforTime-tvseries-views-dialog',
  templateUrl: './tvseries-views-dialog.component.html',
  styleUrls: ['./tvseries-views-dialog.component.scss']
})
export class TvseriesViewsDialogComponent implements OnInit {

  @Input() tvSeries: ITvSeriesModel

  constructor() { }

  ngOnInit(): void {
  }

}
