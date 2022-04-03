import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMovieModel } from '../models/movies.model';
import { DialogActionMode } from 'src/app/shared/enums/dialog-action-mode.enum';

@Component({
  selector: 'comforTime-movies-dialog',
  templateUrl: './movies-dialog.component.html',
  styleUrls: ['./movies-dialog.component.scss']
})
export class MoviesDialogComponent implements OnInit {

  //ATTRIBUTI PER CARICAMENTO IMMAGINI MULTIPLE
  images = [];

  //PROPERTIES
  movieForm!: FormGroup;
  actionBtn: string = "Save";
  actionTitle: String = "Aggiungi un film";
  public newMovie: IMovieModel;
  public imageSelected: any;

  constructor(
    public dialogRef: MatDialogRef<MoviesDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    this.movieForm = this.fb.group({
      'year': ['', Validators.required],
      'image_url': [''],
      'description': ['', Validators.required],
      'title': ['', Validators.required],
      'file': [null],
      'movie_id': [''],
      'author': this.fb.group({
        'name': ['', Validators.required],
        'lastName': ['', Validators.required],
      }),
    })

    switch (this.data.mode) {
      case DialogActionMode.INSERT:
        console.log("Dialog in post mode");
        console.log(this.data);
        break;
      case DialogActionMode.VIEW:
        this.actionTitle = null;
        this.actionBtn = null;
        console.log("Dialog open in views mode");
        console.log(this.data);
        break;
      case DialogActionMode.EDIT:
        this.actionTitle = "Aggiorna un film";
        this.actionBtn = "Update";
        console.log(this.data);
        this.movieForm.controls['year'].setValue(this.data.rowData.year);
        this.movieForm.controls['image_url'].setValue(this.data.rowData.image_url);
        this.movieForm.get('image_url')?.disable()
        this.movieForm.controls['description'].setValue(this.data.rowData.description);
        this.movieForm.controls['title'].setValue(this.data.rowData.title);
        this.movieForm.controls['movie_id'].setValue(this.data.rowData.movie_id);
        this.movieForm.get('author.name')?.setValue(this.data.rowData.author.name),
        this.movieForm.get('author.lastName')?.setValue(this.data.rowData.author.lastName);
        break;
      default:
        break;
    }

    // if (this.data) {
    //   this.actionBtn = "Update";
    //   this.movieForm.controls['year'].setValue(this.data.year);
    //   this.movieForm.controls['image_url'].setValue(this.data.file);
    //   this.movieForm.get('image_url')?.disable()
    //   //this.movieForm.controls['file'].setValue(this.data.file);
    //   //this.movieForm.get('file')?.disable();
    //   this.movieForm.controls['description'].setValue(this.data.description);
    //   // this.movieForm.controls['author'].setValue(this.data.author);
    //   this.movieForm.controls['title'].setValue(this.data.title);
    //   this.movieForm.controls['movie_id'].setValue(this.data.movie_id);
    //   this.movieForm.get('author.name')?.setValue(this.data.author.name),
    //     this.movieForm.get('author.lastName')?.setValue(this.data.author.lastName);
    // }

  }
  /**
   *  ------> end of ngOnInit <-------------------
   */


  /**
   * -----------------------METHODS----------------------------------------
   */

  onNoClick(): void {
    this.dialogRef.close();
  }

  // METODO PER L'UPLOAD DI UNA SINGOLA IMMAGINE
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

  // METODO PER L'UPLOAD DI IMMAGINI MULTIPLE
  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
   
                reader.onload = (event:any) => {
                  console.log(event.target.result);
                   this.images.push(event.target.result); 
   
                   this.movieForm.get('file').setValue({
          name: this.images,
          data: this.images
        });
                }
  
                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }


  //PASS THE VALUE OF THE FORM-GROUP TO THE DIALOG(in parent component)
  sendData(movieForm: FormGroup) {
    // PASSAGGIO DATI
    // this.dialogRef.close("IT WAS SAVED!");

    /**
     * 
     */
    this.newMovie = this.movieForm.getRawValue();



    this.dialogRef.close(this.newMovie);

    console.log(this.movieForm.value);

  }

  //method created to read the nested formField inside a formControl
  getControl(name: string) {
    return this.movieForm.get(name) as FormControl;
  }
}



  // --------------------- END METHODS-----------------------------------



/**
   *  ------> end of class component <-------------------
   */
