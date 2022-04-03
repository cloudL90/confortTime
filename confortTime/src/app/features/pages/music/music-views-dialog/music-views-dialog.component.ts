import { Component, Input, OnInit } from '@angular/core';
import { IMusicModel } from '../models/music.model';

@Component({
  selector: 'comforTime-music-views-dialog',
  templateUrl: './music-views-dialog.component.html',
  styleUrls: ['./music-views-dialog.component.scss']
})
export class MusicViewsDialogComponent implements OnInit {

  @Input() music: IMusicModel;
  isReadMore: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  showText() {
    this.isReadMore = !this.isReadMore
  }
}
