import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';




@Component({
  selector: 'ac-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  error:string;
  constructor(private router:Router , private authService:AuthService ) { }

  ngOnInit(): void {
  }
  login(){
    this.error='';
    this.authService
    .login(this.email,this.password)
    .subscribe(s =>this.router.navigate(['/dialog']),
        e=> (this.error=e));
  }

}
