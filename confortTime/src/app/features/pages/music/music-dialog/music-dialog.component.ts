import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogActionMode } from 'src/app/shared/enums/dialog-action-mode.enum';
import { IMusicModel } from '../models/music.model';

@Component({
  selector: 'comforTime-music-dialog',
  templateUrl: './music-dialog.component.html',
  styleUrls: ['./music-dialog.component.scss']
})
export class MusicDialogComponent implements OnInit {

  musicForm!: FormGroup;
  actionTitle: string = "Aggiungi una canzone";
  actionBtn: string = "Save";
  newMusic: IMusicModel;
  imageSelected: any;

  constructor(public dialogRef: MatDialogRef<MusicDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    this.musicForm = this.fb.group({
      'title': ['', Validators.required],
      'image_url': [''],
      'description': ['', Validators.required],
      'file': [null],
      'music_id': [''],
      'artist': this.fb.group({
        'name': ['', Validators.required],
        'group': ['', Validators.required],
      }),
      'album': this.fb.group({
        'name': ['', Validators.required],
        'year': ['', Validators.required],
      })
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
        this.actionTitle = "Aggiorna una canzone";
        this.actionBtn = "Update";
        this.musicForm.controls['title'].setValue(this.data.rowData.title);
        this.musicForm.controls['image_url'].setValue(this.data.rowData.image_url);
        this.musicForm.get('image_url')?.disable()
        this.musicForm.controls['description'].setValue(this.data.rowData.description);
        this.musicForm.controls['music_id'].setValue(this.data.rowData.music_id);
        this.musicForm.get('artist.name')?.setValue(this.data.rowData.artist.name),
        this.musicForm.get('artist.group')?.setValue(this.data.rowData.artist.group),
        this.musicForm.get('album.name')?.setValue(this.data.rowData.album.name);
        this.musicForm.get('album.year')?.setValue(this.data.rowData.album.year);
        break;
      default:
        break;
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
              this.musicForm.get('file').setValue({
                  name: file.name,
                  data: imgBase64Path
                });
              }
            };
            reader.readAsDataURL(file);
  }

  //PASS THE VALUE OF THE FORM-GROUP TO THE DIALOG(in parent component)
  sendData(musicForm: FormGroup) {
    this.newMusic = this.musicForm.getRawValue();
    this.dialogRef.close(this.newMusic);
  }

  getControl(name: string) {
    return this.musicForm.get(name) as FormControl;
  }

}
