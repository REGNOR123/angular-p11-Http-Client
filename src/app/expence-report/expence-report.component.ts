import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../blogs.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-expence-report',
  templateUrl: './expence-report.component.html',
  styleUrls: ['./expence-report.component.css'],
})
export class ExpenceReportComponent implements OnInit {
  //STEP-4 : creating the variables, which will hold final value which is fetched through service methods
  userList: any;

  constructor(private blogService: BlogsService) {} // STEP-3.1 : Create the Instance of Service to use it further

  ngOnInit(): void {
    //STEP-4.1 : Excess the Methods which is defining in the services, and extracting the data through api
    //NOTE : we have to subscribe the methods coming from services because they are holding the API-methods

    this.blogService.getUsers().subscribe((data) => {
      this.userList = data;
      console.log(data);
    });
  }
  // Export to PDF function
  exportUserReport(): void {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set the title at the center of the page
    doc.setFontSize(24);
    const pageWidth = doc.internal.pageSize.width; // Get the width of the page
    doc.text('User Records', pageWidth / 2, 20, { align: 'center' });

    // Add a header for the user table
    doc.setFontSize(10); // Smaller font size for headers
    doc.text('S.No', 20, 40);
    doc.text('Username', 40, 40);
    doc.text('Email', 80, 40);
    doc.text('Password', 140, 40);

    let startY = 50; // Starting position for the table rows

    // Iterate over userList to add each user's data to the PDF
    this.userList.forEach((user, index) => {
      doc.text(`${index + 1}`, 20, startY); // Serial number
      doc.text(user.username, 40, startY); // Username
      doc.text(user.email, 80, startY); // Email
      doc.text(user.password, 140, startY); // Password
      startY += 10; // Move to the next row
    });

    // Save the document as a PDF
    doc.save('user_report.pdf');
  }
  handleDelete(userId) {
    // once delete button hitted this method triggered which takes user id as an argument

    if (confirm('Are you sure') == true) {
      // if user confirm "ok"
      this.blogService.removeUsers(userId).subscribe((data) => {
        // delete api endpoint will be triggerd and delete the record
        console.log('User Deleted successfully:', data);
      });
    }
  }
}
