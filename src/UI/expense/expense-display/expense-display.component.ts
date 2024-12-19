import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { BlogsService } from 'src/app/blogs.service';

@Component({
  selector: 'app-expense-display',
  templateUrl: './expense-display.component.html',
  styleUrls: ['./expense-display.component.css'],
})
export class ExpenseDisplayComponent implements OnInit {
  expenseList: any;
  loggedInUserId: number | null = null;
  constructor(
    private expenseService: ExpenseService,
    private blogsService: BlogsService
  ) {}

  ngOnInit(): void {
    this.blogsService.getUsers().subscribe((data) => {
      this.loggedInUserId = data[0].id;
      console.log('userid', this.loggedInUserId);
    });

    this.expenseService.getExpense().subscribe((data) => {
      this.expenseList = data;
      console.log(data);
    });
  }

  exportUserReport(): void {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set the title at the center of the page
    doc.setFontSize(18);
    const pageWidth = doc.internal.pageSize.width; // Get the width of the page
    doc.text('Expenses Report', pageWidth / 2, 10, { align: 'center' });

    // Define table headers
    const columns = [
      'S.No',
      'Item',
      'Category',
      'Description',
      'Date',
      'Amount (INR)',
    ];

    // Map expense data to rows
    const rows = this.expenseList.map((expense, index) => [
      index + 1, // Serial number
      expense.item || '', // Item
      expense.category || '', // Category
      expense.description || '', // Description
      new Date(expense.date).toLocaleDateString() || '', // Date
      expense.amount.toFixed(2) || '', // Amount, formatted to two decimal places
    ]);

    // Add table to the PDF using autoTable
    (doc as any).autoTable({
      head: [columns], // Header row
      body: rows, // Data rows
      startY: 20, // Starting Y position for the table
      theme: 'grid', // Table style
      headStyles: { fillColor: [100, 150, 255] }, // Header background color
      bodyStyles: { fontSize: 10 }, // Font size for rows
      margin: { left: 10, right: 10 }, // Margins
    });

    // Save the document as a PDF
    doc.save('expenses_report.pdf');
  }

  handleDelete(expenseId) {
    // once delete button hitted this method triggered which takes user id as an argument

    if (confirm('Are you sure') == true) {
      // if user confirm "ok"
      this.expenseService.removeExpense(expenseId).subscribe((data) => {
        // delete api endpoint will be triggerd and delete the record
        console.log('User Deleted successfully:', data);
      });
    }
  }
}
