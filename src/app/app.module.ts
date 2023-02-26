import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //     imported in shared module 
 import { PmMaterialModule } from './shared/material-module';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { BlocksModule } from './blocks/blocks.module';

import { AppComponent } from './blocks/root/app.component';

// import { LoginComponent } from './login/login.component';         // imported in auth module
// import { RegisterComponent } from './register/register.component';
import { AuthHeaderInterceptorService } from './core/interceptor/auth-header-interceptor.service';
import { CoreModule } from './core/core.module';



@NgModule({
  declarations: [
    //AppComponent,
   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
   // ProductsModule,
    HttpClientModule,
    PmMaterialModule,
    SharedModule,
    AuthModule,
    BlocksModule,
    CoreModule

  ],
  providers: [
  //{       imported providers in core module              
   
  // provide: HTTP_INTERCEPTORS,
    // useClass: AuthHeaderInterceptorService,
    // multi:true
  //}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
