import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';


@Component({
  selector: 'ac-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userGroup = new FormGroup({
    fullName : new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required]),
    repeatPassword: new FormControl('',[Validators.required,
      this.passwordsMatch ])
   });
  constructor(private router:Router ,private  authService:AuthService) { }
  get fullName(){
    return this.userGroup.get('fullName');
  }
  get email(){
   return this.userGroup.get('email');
 }
 get password(){
   return this.userGroup.get('password');
 }
 get repeatPassword(){
   return this.userGroup.get('repeatPassword');
 }

  ngOnInit(): void {
  }

  passwordsMatch(control:FormControl){
    const Password = control.root.get('Password');
    return Password && control.value !== Password.value?
    {
     passwordMatch : true
    }
     :null;
 }
   register(){
    if(!this.userGroup.valid){
       return;
     }
   const user = this.userGroup.getRawValue();
    this.authService
    .register(user)
    .subscribe(s=>this.router.navigate(['/']));

 }

}
