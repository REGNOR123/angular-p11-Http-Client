import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../blogs.service'; // STEP-3 : Import the service
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  constructor(private blogService: BlogsService) {} // STEP-3.1 : Create the Instance of Service to use it further

  //STEP-4 : creating the variables, which will hold final value which is fetched through service methods
  userList: any;
  postsList: any;
  commentsList: any;

  ngOnInit(): void {
    //STEP-4.1 : Excess the Methods which is defining in the services, and extracting the data through api
    //NOTE : we have to subscribe the methods coming from services because they are holding the API-methods

    this.blogService.getUsers().subscribe((data) => {
      this.userList = data;
      console.log(data);
    });
  }

  handleDelete(userId) {
    // once delete button hitted this method triggered which takes user id as an argument

    if (confirm('Are you sure') == true) {
      // if user confirm "ok"
      this.blogService.removeUsers(userId).subscribe((data) => {
        // delete api endpoint will be triggerd and delete the record
        console.log('User updated successfully:', data);
      });
    }
  }
}
