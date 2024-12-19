import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; // Importing the model to for routing
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
    private router: Router
  ) {
    this.updateForm = this.updateFormBuilder.group({
      userName: new FormControl(),
      userEmail: new FormControl(),
      userPassword: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id'); // getting the id of the content when redirecting

    this.blogService.getUsers().subscribe((data: any[]) => {
      // filtering the user data on the basis of user id
      this.userList = data.find((user) => user.id === +this.userId);

      console.log('User ID:', this.userId);
      console.log('User Data:', this.userList);

      // Populate the form fields with the fetched data
      if (this.userList) {
        this.updateForm.patchValue({
          // puting the filterd value back into the form fields
          userName: this.userList.username,
          userEmail: this.userList.email,
          userPassword: this.userList.password,
        });
      } else {
        console.error('User not found');
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
    const requestBody = {
      // creating the request body having updated fields value
      username: this.updateForm.value.userName,
      email: this.updateForm.value.userEmail,
      password: this.updateForm.value.userPassword,
    };
    // Updating the user using the service
    this.blogService.updateUsers(requestBody, this.userId).subscribe({
      next: (data) => {
        console.log('User updated successfully:', data);

        // Redirect to home page on success
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error updating user:', err);
      },
    });
  }
}
