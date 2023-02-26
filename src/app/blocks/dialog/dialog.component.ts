import { Component, OnInit,ViewChild,AfterViewInit, } from '@angular/core';
import {MatDialog , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NotesService } from '@core/note/notes.service';
import { DialogNoteComponent } from '../dialog-note/dialog-note.component';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'ac-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category', 'date', 'phone', 'comment','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog:MatDialog,private notesService:NotesService) { }

  ngOnInit(): void {
    this.getAllNotes();
  }
 
  openDialog() {
    this.dialog.open(DialogNoteComponent,{
      width:'35%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllNotes();
      }
    })
 }


 getAllNotes(){
  this.notesService.getNotes()
     .subscribe({
      next:(res)=>{
        // console.log(res);
        this.dataSource =  new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:()=>{
        alert("Error While Fetching Notes From DB ");
      }
     })
 }

 editNotes(row:any){
  this.dialog.open(DialogNoteComponent,{
    width:"30%",
    data:row
  }).afterClosed().subscribe(val=>{
    if(val==='update'){
      this.getAllNotes();
    }
    
  })
 }
 deleteNotes(id:number){
   this.notesService.deleteNotes(id)
    .subscribe({
      next:(res)=>{
        // console.log(res);
        alert("Notes Deleted Successfully");
        this.getAllNotes();
      },
      error:()=>{
        alert("Error While Deleting The Notes ");
      }
         
    })
 }

 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}
