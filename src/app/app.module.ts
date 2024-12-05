import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; // STEP-1 Import the HttpClientModeule
import { BlogsComponent } from './blogs/blogs.component';   

@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule  // STEP-1 : Import the HttpClientModeule, in import array
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
