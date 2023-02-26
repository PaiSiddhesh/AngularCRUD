import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DialogNoteComponent } from './dialog-note/dialog-note.component';
import { DialogComponent } from './dialog/dialog.component';


const routes: Routes = [
  {path :'dialog',
    pathMatch:'full',
  component:DialogComponent
  },
  {path :'dialog-note',
  pathMatch:'full',
  component:DialogNoteComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlocksRoutingModule { }
