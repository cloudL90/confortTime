import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UserData } from 'src/app/core/userSession/model/user-session.model';
import { UserSessionService } from 'src/app/core/userSession/services/user-session.service';
import { DialogActionMode } from 'src/app/shared/enums/dialog-action-mode.enum';
import { DeleteMusicRequest } from '../../music/models/music-request.models';
import { DeleteTvSeriesRequest, GetTvSeriesRequest } from '../models/tvSeries-request.models';
import { ITvSeriesModel } from '../models/tvSeries.model';
import { TvseriesService } from '../service/tvseries.service';
import { TvSeriesDialogComponent } from '../tv-series-dialog/tv-series-dialog.component';

@Component({
  selector: 'app-tv-series',
  templateUrl: './tv-series.component.html',
  styleUrls: ['./tv-series.component.scss']
})
export class TvSeriesComponent implements OnInit {
  temaScelto = localStorage.getItem('theme-color');
  seriesTVLoading: boolean;
  //MATERIAL COPIED FROM TS TABLE
  displayedColumns: string[] = ['title', 'actors', 'season', 'episode', 'image_url', 'action'];
  dataSource!: MatTableDataSource<ITvSeriesModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private userData: UserData;
  newTvSeries: ITvSeriesModel;
  allTvSeries: [ITvSeriesModel];
  updateTvSeries: ITvSeriesModel;
  tvSeriesId: string;

  constructor(private tvSeriesService: TvseriesService, private userSession: UserSessionService,
              private dialog: MatDialog, private toast: ToastrService) { }

  ngOnInit(): void {
    this.seriesTVLoading = false
    this.userData = this.userSession.getUserData();
    this.getAllTvSeries();

  }

  showPostSuccess() {
    this.toast.success("Tv Series aggiunta al db", "", {
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      //preventDuplicates: true
    });
  }

  showUpdateSuccess() {
    this.toast.info("Tv Series modificata", "", {
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      //preventDuplicates: true
    });
  }

  showDeleteSuccess() {
    this.toast.error("Tv Series eliminata", "", {
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      //preventDuplicates: true
    });
  }

  showError() {
    this.toast.error("Qualcosa non funziona", "", {
    timeOut: 1000,
    progressBar: true,
    progressAnimation: 'increasing',
    //preventDuplicates: true
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openViewsTvSeries(row: ITvSeriesModel) {
    const obj = {
      mode: DialogActionMode.VIEW,
      rowData: {
        ...row
      } 
    }
    this.dialog.open(TvSeriesDialogComponent, {
      width: '50%',
      height: '50%',
      data: obj
    })
  }

  openDialog() {
    //import the component "dialog"
    const obj = {
      mode: DialogActionMode.INSERT,
      width: '100%',
      height: '100%',
      rowData: {
      } 
    }
    const dialogRef = this.dialog.open(TvSeriesDialogComponent, {
      width: '70%',
      height: '100%',
      data: obj
    })
    dialogRef.afterClosed()
    .subscribe(res => {
      if(res) {
        this.newTvSeries= res;
        console.log(this.newTvSeries);
        this.postTvSeries();
      }
    })
  }

  editTvSeries(row: ITvSeriesModel) {
    const obj = {
      mode: DialogActionMode.EDIT,
      rowData: {
        ...row
      } 
    }
    this.dialog.open(TvSeriesDialogComponent, {
      width: '50%',
      height: '100%',
      data: obj
    }).afterClosed().subscribe((val) => {
      if(val) {
        this.updateTvSeries = val;  
        this.tvSeriesId = this.updateTvSeries.tv_series_id;
        delete this.updateTvSeries.tv_series_id;
        this.updateTvSerie();
      }
    })
  }

  postTvSeries() {
    const req = {
      user_id: this.userData.user_id,
      data: this.newTvSeries
    }
    this.tvSeriesService.registerTvSeries(req)
    .subscribe(res => {
      this.showPostSuccess();
      this.getAllTvSeries();
    },
    error => {
      this.showError();
    })
  }

  updateTvSerie() {
    const req = {
      user_id: this.userData.user_id,
      tv_series_id: this.tvSeriesId,
      data: this.updateTvSeries
    }
    this.tvSeriesService.updateTvSeries(req)
    .subscribe(res => {
      this.showUpdateSuccess();
      this.getAllTvSeries();
    },
    error => {
      this.showError();
    })
  }

  getAllTvSeries() {
    const getTvSeriesRequest: GetTvSeriesRequest = {
      user_id: this.userData.user_id
    }
    this.tvSeriesService.getAllTvSeries(getTvSeriesRequest)
    .subscribe(res => {
      this.seriesTVLoading = true;
      this.allTvSeries = res.items;
      this.dataSource = new MatTableDataSource(this.allTvSeries);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.allTvSeries);
    })
  }

  deleteTvSeries(tv_series_id: string) {
    const deleteTvSeriesRequest : DeleteTvSeriesRequest = {
      user_id: this.userData.user_id,
      tv_series_id: tv_series_id
    }
  this.tvSeriesService.deletetvSeries(deleteTvSeriesRequest)
  .subscribe(res=> {
    this.showDeleteSuccess();
    this.getAllTvSeries();
  },
  error => {
    this.showError();
  })
 }


 setTheme(theme: string) {
  localStorage.setItem('theme-color', theme);
  this.temaScelto = localStorage.getItem('theme-color');

}
}
