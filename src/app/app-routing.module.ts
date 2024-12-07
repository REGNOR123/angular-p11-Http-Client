import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { SignupUserComponent } from './signup-user/signup-user.component';


const routes: Routes = [
  {path:'home', redirectTo:'home',pathMatch:'full'},
  {path:'home', component:BlogsComponent},
  {path:'signup', component: SignupUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
