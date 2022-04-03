import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUrlService {

 //properties
  public subject = new Subject<string>();

  constructor() { }

  //methods

  //send the section where we are from one component where we call the service, to another component (we'll get it with fetchUrl function)
  sendUrl(section: string) {
    this.subject.next(section)
  }

  fetchUrl(): Observable<string> {
    return this.subject.asObservable();
  }
}
