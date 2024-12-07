import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // STEP-2.1 : import the httpClient toi access the methods like get, put, post and delete

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  // STEP-2 : Create the service to make the http calls or to define the methods for http.

  constructor(private httpClient: HttpClient) {} // STEP-2.2 : Create the instance of HttpClient, to use it further in defining the http methods

  // STEP-2.3 : Define the methods to get response through http-methods
  getUsers() {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type','application/json');
    return this.httpClient.get('http://localhost:3000/users');
  }
  getPosts() {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type','application/json');
    return this.httpClient.get('http://localhost:3000/posts');
  }
  getComments() {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type','application/json');
    return this.httpClient.get('http://localhost:3000/comments');
  }

// STEP-2.4 : Define the methods to send request through http-methods
  createUsers(userBody) {
    const httpHeaders = new HttpHeaders();   // Create Header object to accept the headers in the POST request.
    httpHeaders.append('content-type','application/json');
    return this.httpClient.post('http://localhost:3000/users', userBody, {headers: httpHeaders});
    
  }
}
