import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; // STEP-1 Import the HttpClientModeule
import { BlogsComponent } from './blogs/blogs.component';
import { SignupUserComponent } from './signup-user/signup-user.component';   
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    SignupUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  // STEP-1 : Import the HttpClientModeule, in import array
    ReactiveFormsModule  // STEP-1 Creating reactive form
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
