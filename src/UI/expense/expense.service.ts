import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // STEP-2.1 : import the httpClient toi access the methods like get, put, post and delete


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private httpClient: HttpClient) { }

  getExpense() {
    const httpHeaders = new HttpHeaders({
      'Content-type': 'application/json',
    });
    return this.httpClient.get('http://localhost:3000/api/expenses', {
      headers: httpHeaders,
    });
  }

  // STEP-2.4 : Define the methods to send request through http-methods
  createExpense(userBody) {
    const httpHeaders = new HttpHeaders({
      'Content-type': 'application/json', // Use object initialization for headers
    });
    return this.httpClient.post('http://localhost:3000/api/expenses', userBody, {
      headers: httpHeaders,
    });
  }

  // STEP-2.5 : Define the methods to send UPDATE request through http-methods
  updateExpense(userBody, userId) {
    const httpHeaders = new HttpHeaders({
      'Content-type': 'application/json', // Use object initialization for headers
    });
    return this.httpClient.put(
      `http://localhost:3000/api/expenses/${userId}`,
      userBody,
      { headers: httpHeaders }
    );
  }

  // STEP-2.6 : Define the methods to send Delete request through http-methods
  removeExpense(userId) {
    return this.httpClient.delete(`http://localhost:3000/api/expenses/${userId}`);
  }
}


