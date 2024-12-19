import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; // STEP-1 Import the HttpClientModeule
import { SignupUserComponent } from './signup-user/signup-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateUserComponent } from './update-user/update-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { ExpenceReportComponent } from './expence-report/expence-report.component';
import { ExpenseModule } from 'src/UI/expense/expense.module';

@NgModule({
  declarations: [
    AppComponent,
    SignupUserComponent,
    UpdateUserComponent,
    LoginUserComponent,
    DasboardComponent,
    ExpenceReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // STEP-1 : Import the HttpClientModeule, in import array
    ReactiveFormsModule, // STEP-1 Creating reactive form
    ExpenseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
