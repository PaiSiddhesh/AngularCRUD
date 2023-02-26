import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatDialog , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
//import { userInfo } from 'os';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { User } from '../../core/user';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'ac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy ,OnInit {
  user: User;
  userSubscription:Subscription;
  
    constructor(private authService:AuthService,private router:Router,private dialog:MatDialog){
    this.authService.findMe().subscribe(user=>(this.user = user));

    this.userSubscription = this.authService.user.subscribe(
      user=>(this.user=user));

  }


  ngOnInit(): void {
      //this.user=this.authService.user;
      this.userSubscription = this.authService.findMe().subscribe(user=>(this.user = user));
  }

  openDialog() {
    this.dialog.open(DialogComponent,{
      width:'35%'
    })
 }


  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }

}
