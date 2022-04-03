import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogActionMode } from 'src/app/shared/enums/dialog-action-mode.enum';
import { IBookModel, Book_Field } from '../models/book.model';

@Component({
  selector: 'app-books-dialog',
  templateUrl: './books-dialog.component.html',
  styleUrls: ['./books-dialog.component.scss']
})
export class BooksDialogComponent implements OnInit {

  book: IBookModel;
  bookForm!: FormGroup;
  actionBtn: string = "Save";
  actionTitle: String = "Aggiungi un Libro";
  public newBook: IBookModel;
  public imageSelected: any;

  constructor(
    public dialogRef: MatDialogRef<BooksDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }



  ngOnInit(): void {

    this.bookForm = this.fb.group({
      'year': ['', Validators.required],
      'image_url': [''],
      'description': ['', Validators.required],
      'title': ['', Validators.required],
      'file': [null],
      'book_id': [''],
      'author': this.fb.group({
        'name': ['', Validators.required],
        'lastname': ['', Validators.required],
      }),
    })

    switch (this.data.mode) {
      case DialogActionMode.INSERT:
        console.log("Dialog in post mode");
        break;
      case DialogActionMode.VIEW:
        this.actionTitle = null;
        this.actionBtn = null;
        console.log("Dialog open in views mode");
        break;
      case DialogActionMode.EDIT:
        this.actionTitle = "Aggiorna un Libro";
        this.actionBtn = "Update";
        this.bookForm.controls['year'].setValue(this.data.rowData.year);
        this.bookForm.controls['image_url'].setValue(this.data.rowData.image_url);
        this.bookForm.get('image_url')?.disable()
        this.bookForm.controls['description'].setValue(this.data.rowData.description);
        this.bookForm.controls['author'].setValue(this.data.rowData.author);
        this.bookForm.controls['title'].setValue(this.data.rowData.title);
        this.bookForm.controls['book_id'].setValue(this.data.rowData.book_id);
        this.bookForm.get('author.name')?.setValue(this.data.rowData.author.name),
        this.bookForm.get('author.lastname')?.setValue(this.data.rowData.author.lastname);
        break;
      default:
        break;
    }

    // if (this.data.mode ) {
    //   console.log(this.data.mode);

    //   this.actionBtn = "Update";
    //   this.bookForm.controls['year'].setValue(this.data.year);
    //   this.bookForm.controls['image_url'].setValue(this.data.image_url);
    //   this.bookForm.get('image_url')?.disable()
    //   this.bookForm.controls['description'].setValue(this.data.description);
    //   this.bookForm.controls['author'].setValue(this.data.author);
    //   this.bookForm.controls['title'].setValue(this.data.title);
    //   this.bookForm.controls['book_id'].setValue(this.data.book_id);
    //   this.bookForm.get('author.name')?.setValue(this.data.author.name),
    //     this.bookForm.get('author.lastname')?.setValue(this.data.author.lastname);
    //   //this.bookForm.get('author.name')?.setValue(this.bookForm.get('author.name'));
    //   //JSON.stringify(this.bookForm.get('author.surname')?.setValue(this.bookForm.get('author.surname')));
    //   //this.bookForm.get(['author', 'name'])?.setValue(JSON.stringify(this.bookForm.get(['author', 'name'])));
    //}
  }

  onNoClick(): void {
    this.dialogRef.close();
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
        this.bookForm.get('file').setValue({
          name: file.name,
          data: imgBase64Path
        });
      }
    };
    reader.readAsDataURL(file);
  }

  //PASS THE VALUE OF THE FORM-GROUP TO THE DIALOG(in parent component)
  sendData(movieForm: FormGroup) {
    // PASSAGGIO DATI
    this.newBook = this.bookForm.getRawValue();
    //console.log(this.newBook);
    //this.variabile = this.bookForm.controls['file'].value;
    // if(this.variabile.name != null) {
    //   console.log("pippo"); 
    // }
    //console.log(this.variabile);

    //console.log(this.groupForm.value);
    this.dialogRef.close(this.newBook);
  }

  getControl(name: string) {
    return this.bookForm.get(name) as FormControl;
  }
}
