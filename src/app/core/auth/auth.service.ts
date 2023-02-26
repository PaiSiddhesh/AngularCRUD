import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EMPTY } from 'rxjs';
import { of, Subject, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { LogService } from '../log.service';
import { TokenstorageService } from './tokenstorage.service';
import{User} from '../user'


// export interface User{
//   email:string;
//   fullName:string;
//   password:string;
//   repeatpassword:string;
//   roles?: any[];
// }


interface UserDto{
  user:User;
  token:string;
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user = new Subject<User>();
   private user$ =new  Subject <User>();
   //private apiUrl='/api/auth/';
   private apiUrl='/api/auth/';
  constructor(private httpClient:HttpClient, private tokenStorage:TokenstorageService ,
    private  logService:LogService) { }

       
  login(email: string, password: string) {
    const loginCredentials = {email,password};
    console.log ('Login Credentials',loginCredentials);
    //return of(loginCredentials);

    return this.httpClient
              .post<UserDto>(`${this.apiUrl}login`,loginCredentials)
              .pipe(
                switchMap(({user , token})=>{
                    this.setUser(user);
                    this.tokenStorage.setToken(token);
                    console.log(`User Found`,user)
                    return of(user);
                  }),
                 catchError(e=>{
                  // log the actual server error using logservice.
                  this.logService.log(`Server Error Occured :${e.error.message}`,e);
                  //console.log(`User Not Found ,Please Try Again`,e);

                  return throwError(
                    `Login Details Could Not Be Verified , Please Try Again`);
                 })
              );

  }

     

  logout(){
    // remove token from localStorage
     this.tokenStorage.removeToken();
     this.setUser(null);
     console.log(`User Logout Successfully`);
  }


  get user(){
    return this.user$.asObservable();
  }

  private setUser(user){
   return this.user$.next(user); 
   }

 
   register(userToSave: any) {
    return this.httpClient.post<any> (`${this.apiUrl}register`,userToSave)
    .pipe( switchMap( ({user,token}) =>{
      this.setUser(user);
      this.tokenStorage.setToken(token);
      console.log("User Registerd Successfully",user);
      return of(user);
    }),
    catchError (e=> {
      console.log(`Server Error Occured On Register User `,e);
      return throwError (`Registration Failed Please Contact Admin`);
    })
     
     ); 
   }


  findMe(){
   const token =  this.tokenStorage.getToken();
    if(!token){
      return EMPTY;
    }
    return this.httpClient
    .get<any>(`${this.apiUrl}findme`)
    .pipe(
     switchMap(({user})=>{
         this.setUser(user);
         console.log(`User Found`,user);
         return of(user);
       }),
       catchError(e=>{
        console.log(`Login Details Not Found`,e);

         return throwError(
           `Login details Could not Be Verified , Please Try Again`);
       })
   );
  }

 
}


