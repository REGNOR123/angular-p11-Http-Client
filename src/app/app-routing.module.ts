import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupUserComponent } from './signup-user/signup-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { ExpenceReportComponent } from './expence-report/expence-report.component';
import { ExpenseDisplayComponent } from 'src/UI/expense/expense-display/expense-display.component';
import { ExpenseCreateComponent } from 'src/UI/expense/expense-create/expense-create.component';
import { ExpenseUpdateComponent } from 'src/UI/expense/expense-update/expense-update.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect to login by default
  { path: 'login', component: LoginUserComponent }, // Login displayed on AppComponent
  { path: 'signup', component: SignupUserComponent }, // Signup displayed on AppComponent
  {
    path: 'dashboard',
    component: DasboardComponent,
    children: [
      // Child routes for Dashboard
      { path: '', redirectTo: 'leadreboard', pathMatch: 'full' }, // Redirect to blogs
      { path: 'leadreboard', component: ExpenceReportComponent }, // Blogs displayed on Dashboard
      { path: 'update/:id', component: UpdateUserComponent }, // Update User on Dashboard
      { path: 'expense', component: ExpenseDisplayComponent },
      { path: 'add-expense', component: ExpenseCreateComponent },
      { path: 'update-expense/:id', component: ExpenseUpdateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
