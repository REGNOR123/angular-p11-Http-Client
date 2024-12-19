import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DateFormatePipe } from '../date-formate.pipe';


@Component({
  selector: 'app-expense-create',
  templateUrl: './expense-create.component.html',
  styleUrls: ['./expense-create.component.css']
})
export class ExpenseCreateComponent implements OnInit {
  createForm: FormGroup;
  userId: number;
  constructor(
    private createFormBuilder : FormBuilder,
    private expenseService: ExpenseService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createForm = createFormBuilder.group({
      item: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      date: [''],
      amount: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {

    this.userId = Number(this.route.snapshot.queryParamMap.get('userId'));
    console.log(this.userId);
    
  }

  handleSubmit() {
    console.log(this.createForm);

    const requestBody = {
      // creating a boject which will stored all the data send by reactive form
      item: this.createForm.value.item,
      category: this.createForm.value.category,
      description: this.createForm.value.description,
      date:this.createForm.value.date,
  
      amount: this.createForm.value.amount,
      userId: this.userId
    };
console.log(requestBody);

    this.expenseService.createExpense(requestBody).subscribe((data) => {
      // Finally, we are passing the data into the request body, which further will be passed into services and there it will meet with post method
      console.log(data);
      this.router.navigate(['/dashboard/expense']);
    });
  }
}
