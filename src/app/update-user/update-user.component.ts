import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';  // Importing the model to for routing
import { BlogsService } from '../blogs.service'; // STEP-3 : Import the service

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  userId: any;
  updateForm: FormGroup;
  userList: any;

  constructor(
    private updateFormBuilder: FormBuilder,
    private blogService: BlogsService,
    private route: ActivatedRoute,
    private router: Router // Inject Router
  ) {
    this.updateForm = updateFormBuilder.group({
      //building the form using formbuilder
      userName: new FormControl(), //in the formbuilder - we are creating a group of form elements
      userEmail: new FormControl(), //these should be exactly same as your form
      userPassword: new FormControl(),
    });
  } //FormBuilder help us to build the form

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');    // getting the id of the content when redirecting 

    this.blogService.getUsers().subscribe((data) => { // filtering the user data on the basis of user id
      this.userList = data[this.userId - 1];
      console.log(this.userId - 1);
      console.log(this.userList);

      // Populate the form fields with the fetched data
      if (this.userList) {
        this.updateForm.patchValue({ // puting the filterd value back into the form fields
          userName: this.userList.name,
          userEmail: this.userList.email,
          userPassword: this.userList.password,
        });
      }
    });
  }

  // Form submission handler
  handleSubmit(): void {
    if (this.updateForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    // Creating the request body
    const requestBody = {     // creating the request body having updated fields value
      id: this.userId,
      name: this.updateForm.value.userName,
      email: this.updateForm.value.userEmail,
      password: this.updateForm.value.userPassword,
    };

    // Updating the user using the service
    this.blogService.updateUsers(requestBody, this.userId).subscribe({
      next: (data) => {
        console.log('User updated successfully:', data);

        // Redirect to home page
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error updating user:', err);
      },
    });
  }
}
