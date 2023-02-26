import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlocksRoutingModule } from './blocks-routing.module';

import { AppComponent } from './root/app.component';
import { SharedModule } from '../shared/shared.module';
import { DialogComponent } from './dialog/dialog.component';
import { DialogNoteComponent } from './dialog-note/dialog-note.component';


@NgModule({
  declarations: [
       AppComponent,
       DialogComponent,
       DialogNoteComponent
  ],
  imports: [
    CommonModule,
    BlocksRoutingModule,
    SharedModule
  ],exports:[
  
  ]
})
export class BlocksModule { }
