import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder,Validators } from '@angular/forms';
import { NotesService } from '@core/note/notes.service';
import {MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'ac-dialog-note',
  templateUrl: './dialog-note.component.html',
  styleUrls: ['./dialog-note.component.scss']
})
export class DialogNoteComponent implements OnInit {

  notesForm !:FormGroup;
  actionBtn:string ="Save";

  constructor(private fb:FormBuilder,private notesService:NotesService,
             @Inject(MAT_DIALOG_DATA) public editData : any ,        //editData will have row value
             private dialogRef:MatDialogRef<DialogNoteComponent>) { }

  ngOnInit(): void {
    this.notesForm = this.fb.group({
      name :['',Validators.required ],
      category:['',Validators.required ],
      date :['',Validators.required],
      phone:['',Validators.required],
      comment:['',Validators.required]
    })
       // console.log(this.editData);
       if(this.editData){
        this.actionBtn ="Update";
        this.notesForm.controls['name'].setValue(this.editData.name);
        this.notesForm.controls['category'].setValue(this.editData.category);
        this.notesForm.controls['date'].setValue(this.editData.date);
        this.notesForm.controls['phone'].setValue(this.editData.phone);
        this.notesForm.controls['comment'].setValue(this.editData.comment);
       }
  }
  addNotes(){
   // console.log(this.notesForm.value);
   if(!this.editData){
    if(this.notesForm.valid){
      this.notesService.postNotes(this.notesForm.value)
          .subscribe({
            next:(res)=>{
              alert("Notes Added Successfully In DB");
              this.notesForm.reset();
              this.dialogRef.close('save');
            },
            error:()=>{
              alert("Error While Adding Notes ");
            }
          })
     }
   }else {
    this.UpdateNotes();
   }
  }
  UpdateNotes(){
    this.notesService.putNotes(this.notesForm.value ,this.editData.id)
        .subscribe({
          next:(res)=>{
           alert("Notes Updated Successfully In DB");
           this.notesForm.reset();
           this.dialogRef.close('update');
          },error:()=>{
            alert("Error While Updating Notes ");
          }
        })
  }
}
