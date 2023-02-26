import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http:HttpClient) { }

  postNotes(data:any){
    return this.http.post<any>("http://localhost:3000/noteList/",data) ;
  }
  getNotes(){
    return this.http.get<any>("http://localhost:3000/noteList/") ;
  }
  putNotes(data:any,id:number){
   return this.http.put<any>("http://localhost:3000/noteList/"+id ,data)
  }
  deleteNotes(id:number){
   return this.http.delete<any>("http://localhost:3000/noteList/"+id)
  }
}
