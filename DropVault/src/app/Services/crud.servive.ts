import { HttpClient, HttpHeaders } from '@angular/common/http';
import { File } from './../models/file.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({providedIn:'root'})

export class CrudService {
 
  baseURL: string = "http://localhost:3030/v1/files";
 
  constructor(private http: HttpClient) {
  }

 
  addFile(file:File): Observable<any> {
    const headers = { 'content-type': 'application/json'} 
    const body=JSON.stringify(file);
    console.log(body)
    return this.http.post(this.baseURL , body,{'headers':headers} )
  }
 
}