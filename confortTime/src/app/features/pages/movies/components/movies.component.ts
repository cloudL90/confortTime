import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UserData } from 'src/app/core/userSession/model/user-session.model';
import { UserSessionService } from 'src/app/core/userSession/services/user-session.service';
import { DeleteMovieRequest, GetMoviesRequest } from '../models/movies-request.models';
import { IMovieModel } from '../models/movies.model';
import { MoviesDialogComponent } from '../movies-dialog/movies-dialog.component';
import { MoviesService } from '../service/movies.service';
import { faAsterisk, faClapperboard, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { DialogActionMode } from 'src/app/shared/enums/dialog-action-mode.enum';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  clapperboard = faClapperboard;
  temaScelto = localStorage.getItem('theme-color');
  //MATERIAL COPIED FROM TS TABLE
  displayedColumns: string[] = ['title', 'authorName', 'authorLastname', 'year', 'image_url', 'action'];
  dataSource!: MatTableDataSource<IMovieModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  moviesLoading: boolean;
  private userData: UserData;
  movieForm: FormGroup;
  allMovies: [IMovieModel];
  newMovie: IMovieModel;
  updatedMovie: IMovieModel;
  

  public imageSelected: any;

  private movieId: string;

  constructor(
    private moviesService: MoviesService,
    private fb: FormBuilder,
    private userSession: UserSessionService,
    private dialog: MatDialog,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.moviesLoading = false;
    this.userData = this.userSession.getUserData();

    this.getMovies();

    this.movieForm = this.fb.group({
      'year': ['', Validators.required],
      'file': [null],
      'image_url': [''],
      'author': this.fb.group({
        'name': ['', Validators.required],
        'group': ['', Validators.required]
      })
    })
  }

  showPostSuccess() {
    this.toast.success("Movies aggiunto al db", "", {
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      //preventDuplicates: true
    });
  }

  showUpdateSuccess() {
    this.toast.info("Movies modificato", "", {
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      //preventDuplicates: true
    });
  }

  showDeleteSuccess() {
    this.toast.error("Movies eliminato", "", {
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

  openViewsMovie(row: IMovieModel) {
    const obj = {
      mode: DialogActionMode.VIEW,
      rowData: {
        ...row
      } 
    }
    this.dialog.open(MoviesDialogComponent, {
      width: '50%',
      data: obj
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  onFileSelected(event) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      this.imageSelected = image.src;
      image.onload = rs => {
        const imgBase64Path = e.target.result;
        console.log(imgBase64Path);
        this.movieForm.get('file').setValue({
          name: file.name,
          data: imgBase64Path
        });
      }
    };
    reader.readAsDataURL(file);
  }

  openDialog() {
    const obj = {
      mode: DialogActionMode.INSERT,
      fakeKey: "ciao"
    }
    //import the component "dialog"
    const dialogRef = this.dialog.open(MoviesDialogComponent, {
      width: '50%',
      data: obj
      // height: '50%'
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (res) {
          this.newMovie = res;
          //console.log(this.newBooks.year);
          this.postMovie();
        }
      })

  }


  postMovie() {
    const req = {
      user_id: this.userData.user_id,
      data: this.newMovie
    }
    this.moviesService.registerMovie(req)
      .subscribe(res => {
        this.showPostSuccess();
        this.getMovies();
      },
        error => {
          this.showError();
        })
  }

  getMovies() {
    const getMoviesRequest: GetMoviesRequest = {
      user_id: this.userData.user_id
    }
    this.moviesService.getMovies(getMoviesRequest)
      .subscribe(res => {
        this.moviesLoading = true;
        //console.log(res);
        this.allMovies = res.items;
        this.dataSource = new MatTableDataSource(this.allMovies);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.allMovies);
      })
  }

  editMovie(row: IMovieModel) {
    const obj = {
      mode: DialogActionMode.EDIT,
      rowData: {
        ...row
      }       
    }
    this.dialog.open(MoviesDialogComponent, {
      width: "75%",
      height: "75%",
      data: obj
    }).afterClosed().subscribe((val) => {
      if (val) {
        this.updatedMovie = val;
        this.movieId = this.updatedMovie.movie_id;
        delete this.updatedMovie.movie_id
        //console.log(this.updatedMovie.movie_id);
        this.updatedMovies();
        console.log(this.updatedMovie);

      }
    })
  }


  updatedMovies() {
    const req = {
      user_id: this.userData.user_id,
      movie_id: this.movieId,
      data: this.updatedMovie
    }
    this.moviesService.updatedMovies(req)
      .subscribe(res => {
        this.showUpdateSuccess();
        this.getMovies();
      },
        error => {
          this.showError();
        })
  }

  deleteMovie(movie_id: string) {
    const deleteMovieRequest: DeleteMovieRequest = {
      user_id: this.userData.user_id,
      movie_id: movie_id
    }
    this.moviesService.deleteMovie(deleteMovieRequest)
      .subscribe(res => {
        this.showDeleteSuccess();
        this.getMovies();
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
