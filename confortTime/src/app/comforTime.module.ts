import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './comforTime-routing.module';
import { comforTimeComponent } from './comforTime.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AmplifyService } from 'aws-amplify-angular';
import { FeaturesModule } from './features/features.module';
import { CoreModule } from './core/core.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    comforTimeComponent
  ],
  imports: [
    BrowserModule,
    FeaturesModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    ToastrModule.forRoot()
  ],
  providers: [AmplifyService],
  bootstrap: [comforTimeComponent]
})
export class AppModule { }
