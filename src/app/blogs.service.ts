import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // STEP-2.1 : import the httpClient toi access the methods like get, put, post and delete

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  // STEP-2 : Create the service to make the http calls or to define the methods for http.

  constructor(private httpClient: HttpClient) {} // STEP-2.2 : Create the instance of HttpClient, to use it further in defining the http methods

  // STEP-2.3 : Define the methods to get response or send request through http-methods
  getUsers() {
    return this.httpClient.get('http://localhost:3000/users');
  }
  getPosts() {
    return this.httpClient.get('http://localhost:3000/posts');
  }
  getComments() {
    return this.httpClient.get('http://localhost:3000/comments');
  }
}
