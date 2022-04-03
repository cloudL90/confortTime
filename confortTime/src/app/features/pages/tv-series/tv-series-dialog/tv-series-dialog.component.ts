import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogActionMode } from 'src/app/shared/enums/dialog-action-mode.enum';
import { ITvSeriesModel } from '../models/tvSeries.model';

@Component({
  selector: 'comforTime-tv-series-dialog',
  templateUrl: './tv-series-dialog.component.html',
  styleUrls: ['./tv-series-dialog.component.scss']
})
export class TvSeriesDialogComponent implements OnInit {

  tvSeriesForm!: FormGroup;
  actionTitle: string = "Aggiungi una serie Tv";
  actionBtn: string = "Save";
  newTvSeries: ITvSeriesModel;
  imageSelected: any;

  constructor(public dialogRef: MatDialogRef<TvSeriesDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    this.tvSeriesForm = this.fb.group({
      'title': ['', Validators.required],
      'actors': ['', Validators.required],
      'season': [Validators.required, Validators.pattern('^-?[0-9]*$')],
      'episode': [Validators.required, Validators.pattern('^-?[0-9]*$')],
      'image_url': [''],
      'file': [null],
      'tv_series_id': [''],
      'author': this.fb.group({
        'name': ['', Validators.required],
        'group': ['', Validators.required],
      }),
      'streaming_provider': this.fb.group({
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
        this.actionTitle = "Aggiorna una serie Tv";
        this.actionBtn = "Update";
        this.tvSeriesForm.controls['title'].setValue(this.data.rowData.title);
        this.tvSeriesForm.controls['actors'].setValue(this.data.rowData.actors);
        this.tvSeriesForm.controls['season'].setValue(this.data.rowData.season);
        this.tvSeriesForm.controls['episode'].setValue(this.data.rowData.episode);
        this.tvSeriesForm.controls['image_url'].setValue(this.data.rowData.image_url);
        this.tvSeriesForm.get('image_url')?.disable()
        this.tvSeriesForm.controls['tv_series_id'].setValue(this.data.rowData.tv_series_id);
        this.tvSeriesForm.get('author.name')?.setValue(this.data.rowData.author.name),
        this.tvSeriesForm.get('author.group')?.setValue(this.data.rowData.author.group),
        this.tvSeriesForm.get('streaming_provider.name')?.setValue(this.data.rowData.streaming_provider.name);
        this.tvSeriesForm.get('streaming_provider.year')?.setValue(this.data.rowData.streaming_provider.year);
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
              this.tvSeriesForm.get('file').setValue({
                  name: file.name,
                  data: imgBase64Path
                });
              }
            };
            reader.readAsDataURL(file);
  }

  //PASS THE VALUE OF THE FORM-GROUP TO THE DIALOG(in parent component)
  sendData(musicForm: FormGroup) {
    this.newTvSeries = this.tvSeriesForm.getRawValue();
    this.dialogRef.close(this.newTvSeries);
  }

  getControl(name: string) {
    return this.tvSeriesForm.get(name) as FormControl;
  }

}
