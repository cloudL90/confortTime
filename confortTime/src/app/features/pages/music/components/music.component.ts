import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserData } from 'src/app/core/userSession/model/user-session.model';
import { UserSessionService } from 'src/app/core/userSession/services/user-session.service';
import { DeleteMusicRequest, GetMusicRequest} from '../models/music-request.models';
import { IMusicModel } from '../models/music.model';
import { MusicDialogComponent } from '../music-dialog/music-dialog.component';
import { MusicService } from '../service/music.service';
import { ToastrService } from 'ngx-toastr';
import { DialogActionMode } from 'src/app/shared/enums/dialog-action-mode.enum';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {
  temaScelto = localStorage.getItem('theme-color');
  //MATERIAL COPIED FROM TS TABLE
  displayedColumns: string[] = ['title', 'image_url', 'artistName', 'group', 'albumName', 'year', 'action'];
  dataSource!: MatTableDataSource<IMusicModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private userData: UserData;
  imageSelected: any;
  newMusic: IMusicModel;
  updateMusic!: IMusicModel;
  allMusic: [IMusicModel];
  private musicId: string;
  musicLoading: boolean;

  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file
  
  constructor(private musicService: MusicService, private fb: FormBuilder, private userSession: UserSessionService,
              private dialog: MatDialog, private toast: ToastrService) { }

  ngOnInit(): void {
    this.musicLoading = false;
    this.userData = this.userSession.getUserData();
    this.getMusic();

  }

  showPostSuccess() {
    this.toast.success("Brano aggiunto al db", "", {
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      //preventDuplicates: true
    });
  }

  showUpdateSuccess() {
    this.toast.info("Brano modificato", "", {
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      //preventDuplicates: true
    });
  }

  showDeleteSuccess() {
    this.toast.error("Brano eliminato", "", {
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

  openViewsMusic(row: IMusicModel) {
    const obj = {
      mode: DialogActionMode.VIEW,
      rowData: {
        ...row
      } 
    }
    this.dialog.open(MusicDialogComponent, {
      width: '50%',
      data: obj
    })
  }
  
  openDialog() {
    //import the component "dialog"
    const obj = {
      mode: DialogActionMode.INSERT,
      rowData: {
      } 
    }
    const dialogRef = this.dialog.open(MusicDialogComponent, {
      width: '50%',
      // height: '50%'
      data: obj
    })
    dialogRef.afterClosed()
    .subscribe(res => {
      if(res) {
        this.newMusic = res;
        this.postMusic();
      }
    })
  }

  postMusic() {
    const req = {
      user_id: this.userData.user_id,
      data: this.newMusic
    }
    this.musicService.registerMusic(req)
    .subscribe(res => {
      this.showPostSuccess();
      this.getMusic();
    },
    error => {
      this.showError();
    })
  }

  editMusic(row: IMusicModel) {
    const obj = {
      mode: DialogActionMode.EDIT,
      rowData: {
        ...row
      } 
    }
    this.dialog.open(MusicDialogComponent, {
      width: "75%",
      height: "75%",
      data: obj
    }).afterClosed().subscribe((val) => {
      if(val) {
        this.updateMusic = val;
        this.musicId = this.updateMusic.music_id;
        delete this.updateMusic.music_id;
        this.updateMusics();
      }
    })
  }

  updateMusics() {
    const req = {
      user_id: this.userData.user_id,
      music_id: this.musicId,
      data: this.updateMusic
    }
    this.musicService.updateMusic(req)
    .subscribe(res => {
      this.showUpdateSuccess();
      this.getMusic();
    },
    error => {
      this.showError();
    })
  }

  getMusic() {
    const getMusicRequest: GetMusicRequest = {
      user_id: this.userData.user_id
    }
    this.musicService.getMusic(getMusicRequest)
    .subscribe(res => {
      this.musicLoading = true;
      this.allMusic = res.items;
      this.dataSource = new MatTableDataSource(this.allMusic);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.allMusic);
    })
  }

  deleteMusic(music_id: string) {
    const deleteMusicRequest : DeleteMusicRequest= {
      user_id: this.userData.user_id,
      music_id: music_id
    }
  this.musicService.deleteMusic(deleteMusicRequest)
  .subscribe(res=> {
    this.showDeleteSuccess();
    this.getMusic();
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
