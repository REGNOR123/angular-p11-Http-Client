import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BlogsService } from '../blogs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
})
export class LoginUserComponent implements OnInit {
  loginForm: FormGroup;
  userList : any;
  constructor(
    private loginFormBuilder: FormBuilder,
    private blogService: BlogsService,
    private router: Router
  ) {
    this.loginForm = this.loginFormBuilder.group({
      userName: ['', [Validators.required]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {

    this.blogService.getUsers().subscribe((data) => {
      this.userList = data;
      console.log(data);
    });
  }

  handleSubmit() {

    const username = this.loginForm.value.userName;
    const password = this.loginForm.value.userPassword;

      // Loop through the userList to find a matching username and password
  const user = this.userList.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    console.log('Login successful', user);
    this.router.navigate(['/dashboard'], { queryParams: { username: user.username } });    
  } else {
    console.log('Invalid credentials');
  }
  }
}
