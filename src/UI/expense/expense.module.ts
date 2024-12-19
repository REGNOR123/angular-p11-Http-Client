import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseUpdateComponent } from './expense-update/expense-update.component';
import { ExpenseCreateComponent } from './expense-create/expense-create.component';
import { ExpenseDisplayComponent } from './expense-display/expense-display.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DateFormatePipe } from './date-formate.pipe';

@NgModule({
  declarations: [
    ExpenseUpdateComponent,
    ExpenseCreateComponent,
    ExpenseDisplayComponent,
    DateFormatePipe,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class ExpenseModule {}
