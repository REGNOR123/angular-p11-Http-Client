import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BlogsService } from '../blogs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-user',
  templateUrl: './signup-user.component.html',
  styleUrls: ['./signup-user.component.css'],
})
export class SignupUserComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private signUpformBuilder : FormBuilder,
    private blogService: BlogsService,
    private router: Router
  ) {
    this.signUpForm = signUpformBuilder.group({
      userName: ['', [Validators.required]],
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {}

  handleSubmit() {
    console.log(this.signUpForm);

    const requestBody = {
      // creating a boject which will stored all the data send by reactive form
      username: this.signUpForm.value.userName,
      email: this.signUpForm.value.userEmail,
      password: this.signUpForm.value.userPassword,
    };

    this.blogService.createUsers(requestBody).subscribe((data) => {
      // Finally, we are passing the data into the request body, which further will be passed into services and there it will meet with post method
      console.log(data);
      this.router.navigate(['/login']);
    });
  }
}
