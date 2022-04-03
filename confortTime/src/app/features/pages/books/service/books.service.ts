import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSessionService } from 'src/app/core/userSession/services/user-session.service';
import url from 'src/app/shared/constants/url';
import { environment } from 'src/environments/environment';
import { DeleteBookRequest, GetBookRequest, GetBooksRequest, UpdateBookRequest } from '../models/book-request.models';
import { IBookModel } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  id: string;

  constructor(private httpClient: HttpClient, private userSessionService: UserSessionService) { }

  public registerBook(book: any) {
    return this.httpClient.post<any>(url.apiNerdyAppBooks, book);
  }

  public getBooks(request: GetBooksRequest) {
    const user_id = this.userSessionService.getUserData()['user_id'];
    return this.httpClient.get<any>(url.apiNerdyAppBooks + '/' + user_id);
  }

  public getBook(request: GetBookRequest) {
    const user_id = this.userSessionService.getUserData()['user_id'];
    return this.httpClient.get(url.apiNerdyAppBooks + '/' + user_id + '/' + request.book_id);
  }

  public updateBook(request: UpdateBookRequest) {
    const user_id = this.userSessionService.getUserData()['user_id'];
    return this.httpClient.put(url.apiNerdyAppBooks + '/' + user_id + '/' + request.book_id, request);
  }
  

  public deleteBook(request: DeleteBookRequest) {
    const user_id = this.userSessionService.getUserData()['user_id'];
    return this.httpClient.delete(url.apiNerdyAppBooks + '/' + user_id + '/' + request.book_id);
  }
}
