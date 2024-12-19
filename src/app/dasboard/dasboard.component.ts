import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css'],
})
export class DasboardComponent implements OnInit {
  showWelcomeMessage: boolean = false; // Variable to control the visibility of the welcome message
  username: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
     // Retrieve the username from the query parameters
     this.route.queryParams.subscribe(params => {
      this.username = params['username'];
    });
    
    // Check if the welcome message has been shown before
    const messageShown = sessionStorage.getItem('messageShown');

    // Show the welcome message if it hasn't been shown already
    if (!messageShown) {
      this.showWelcomeMessage = true;
      // Mark that the message has been shown
      sessionStorage.setItem('messageShown', 'true');

      // Hide the welcome message after 5 seconds
      setTimeout(() => {
        this.showWelcomeMessage = false;
      }, 5000);
    }
  }

  handleLogout() {
    // Remove sessionStorage items
    sessionStorage.removeItem('messageShown'); // Remove the flag for welcome message

    // Alternatively, you can clear all sessionStorage data
    // sessionStorage.clear();
  }
}
