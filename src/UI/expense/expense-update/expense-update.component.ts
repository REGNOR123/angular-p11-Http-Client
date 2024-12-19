import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-expense-update',
  templateUrl: './expense-update.component.html',
  styleUrls: ['./expense-update.component.css'],
})
export class ExpenseUpdateComponent implements OnInit {
  itemId: any;
  updateForm: FormGroup;
  itemList: any;
  userId: number;

  constructor(
    private updateFormBuilder: FormBuilder,
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateForm = this.updateFormBuilder.group({
      item: new FormControl(),
      category: new FormControl(),
      description: new FormControl(),
      date: new FormControl() ,
      amount: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id'); // getting the id of the content when redirecting
    this.userId = Number(this.route.snapshot.queryParamMap.get('userId'));
    console.log('user id', this.userId);

    this.expenseService.getExpense().subscribe((data: any[]) => {
      // filtering the user data on the basis of user id
      this.itemList = data.find((items) => items.id === +this.itemId);

      console.log('Item ID:', this.itemId);
      console.log('Item Data:', this.itemList);

      // Populate the form fields with the fetched data
      if (this.itemList) {
        const formattedDate = this.formatDate(this.itemList.date);
        this.updateForm.patchValue({
          // puting the filterd value back into the form fields
          item: this.itemList.item,
          category: this.itemList.category,
          description: this.itemList.description,
          date: formattedDate,
          amount: this.itemList.amount,
        });
      } else {
        console.error('User not found');
      }
      console.log('update form', this.updateForm.value);
    });
  }
  // Date format conversion function
  formatDate(date: string): string {
    const formattedDate = new Date(date).toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
    return formattedDate;
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
      item: this.updateForm.value.item,
      category: this.updateForm.value.category,
      description: this.updateForm.value.description,
      date: this.updateForm.value.date,
      amount: this.updateForm.value.amount,
      userId: this.userId,
    };

    console.log('update form body', requestBody);
    // Updating the user using the service
    this.expenseService.updateExpense(requestBody, this.itemId).subscribe({
      next: (data) => {
        console.log('User updated successfully:', data);

        // Redirect to home page on success
        this.router.navigate(['/dashboard/expense']);
      },
      error: (err) => {
        console.error('Error updating user:', err);
      },
    });
  }
}
