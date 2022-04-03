import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserData } from 'src/app/core/userSession/model/user-session.model';
import { UserSessionService } from 'src/app/core/userSession/services/user-session.service';
import { DeleteBookRequest, GetBookRequest, GetBooksRequest } from '../models/book-request.models';
import { IBookModel } from '../models/book.model';
import { BooksService } from '../service/books.service';
import { MatDialog } from '@angular/material/dialog';
import { BooksDialogComponent } from '../books-dialog/books-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { BooksViewsDialogComponent } from '../books-views-dialog/books-views-dialog.component';
import { DialogActionMode } from 'src/app/shared/enums/dialog-action-mode.enum';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  temaScelto = localStorage.getItem('theme-color');
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  //MATERIAL COPIED FROM TS TABLE
  displayedColumns: string[] = ['name', 'lastname', 'title', 'year', 'image_url', 'action'];
  dataSource!: MatTableDataSource<IBookModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  booksLoading: boolean;
  private userData: UserData;
  allBooks!: [IBookModel];
  newBooks: IBookModel;
  updateBook!: IBookModel;

  private bookId: string;

  constructor(private booksService: BooksService, private fb: FormBuilder, private userSession: UserSessionService,
    private dialog: MatDialog,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {

    this.booksLoading = false;
    this.userData = this.userSession.getUserData();
    console.log(this.userData);
    this.getBooks();
    //this.booksLoading = true;

  }

  edit(book: IBookModel) {
    console.log(book);

  }

  showPostSuccess() {
    this.toast.success("Libro aggiunto al db", "", {
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      //preventDuplicates: true
    });

  }

  showUpdateSuccess() {
    this.toast.info("Libro modificato", "", {
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      //preventDuplicates: true
    });
  }

  showDeleteSuccess() {
    this.toast.error("Libro eliminato", "", {
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

  openViewsBook(row: IBookModel) {
    const obj = {
      mode: DialogActionMode.VIEW,
      rowData: {
        ...row
      }
    }
    this.dialog.open(BooksDialogComponent, {
      // width: '100%',
      // height: '20%',
      data: obj
    })
  }

  openDialog() {
    const obj = {
      mode: DialogActionMode.INSERT,
      rowData: {
      }
    }
    //import the component "dialog"
    const dialogRef = this.dialog.open(BooksDialogComponent, {
      // width: '100%',
      // height: '50%'
      data: obj
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (res) {
          this.newBooks = res;
          //console.log(this.newBooks.year);
          this.postBook();
        }
      })

  }
  postBook() {
    const req = {
      user_id: this.userData.user_id,
      data: this.newBooks
    }
    this.booksService.registerBook(req)
      .subscribe(res => {
        this.showPostSuccess();
        this.getBooks();
      },
        error => {
          this.showError();
        })
  }

  editBook(row: IBookModel) {
    const obj = {
      mode: DialogActionMode.EDIT,
      rowData: {
        ...row
      }
    }
    this.dialog.open(BooksDialogComponent, {
      // width: "75%",
      // height: "75%",
      data: obj
    }).afterClosed().subscribe((val) => {
      if (val) {
        this.updateBook = val;
        this.bookId = this.updateBook.book_id;
        delete this.updateBook.book_id
        //console.log(this.updateBook.book_id);
        this.updateBooks();
      }
    })
  }

  updateBooks() {
    const req = {
      user_id: this.userData.user_id,
      book_id: this.bookId,
      data: this.updateBook
    }
    this.booksService.updateBook(req)
      .subscribe(res => {
        //this.showUpdateSuccess();
        this.getBooks();
      },
        error => {
          //this.showError();
        })
  }

  getBooks() {
    const getBooksRequest: GetBooksRequest = {
      user_id: this.userData.user_id
    }
    this.booksService.getBooks(getBooksRequest)
      .subscribe(res => {
        //console.log(res);
        this.booksLoading = true;
        this.allBooks = res.items;
        this.dataSource = new MatTableDataSource(this.allBooks);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.allBooks);
      },
        error => {
          this.showError();
        })
  }

  getBook(book_id: string) {
    const getBookRequest: GetBookRequest = {
      user_id: this.userData.user_id,
      book_id: book_id
    }
    this.booksService.getBook(getBookRequest)
      .subscribe(res => {
        console.log(res);
      },
        error => {
          this.showError();
        })
  }

  deleteBook(book_id: string) {
    const deleteBookRequest: DeleteBookRequest = {
      user_id: this.userData.user_id,
      book_id: book_id
    }
    this.booksService.deleteBook(deleteBookRequest)
      .subscribe(res => {
        this.showDeleteSuccess();
        this.getBooks();
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
