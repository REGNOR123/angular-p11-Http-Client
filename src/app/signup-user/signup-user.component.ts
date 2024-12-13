import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-signup-user',
  templateUrl: './signup-user.component.html',
  styleUrls: ['./signup-user.component.css'],
})
export class SignupUserComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private signUpformBuilder: FormBuilder,
    private blogService: BlogsService
  ) {
    this.signUpForm = signUpformBuilder.group({
      //building the form using formbuilder
      userName: new FormControl(), //in the formbuilder - we are creating a group of form elements
      userEmail: new FormControl(), //these should be exactly same as your form
      userPassword: new FormControl(),
    });
  } //FormBuilder help us to build the form
  ngOnInit(): void {}

  handleSubmit() {
    console.log(this.signUpForm);

    const requestBody = {   // creating a boject which will stored all the data send by reactive form
      name: this.signUpForm.value.userName,
      email: this.signUpForm.value.userEmail,
      password: this.signUpForm.value.userPassword,
    };


    this.blogService.createUsers(requestBody).subscribe((data)=>{    // Finally, we are passing the data into the request body, which further will be passed into services and there it will meet with post method
      console.log(data);
      
    });
    
  }
}
