import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 

@Injectable({
  providedIn: 'root'
})

export class EnvoiFichierService {

  constructor(private http: HttpClient) { }

  postFile(fichierAEnvoyer: File): Observable<boolean> {
    const url = 'http://localhost:4200/api/api2/files/';
    const formData: FormData = new FormData();
    formData.append('data', fichierAEnvoyer);
    console.log(formData)
    return this.http
      .post(url, formData, { headers: {'Content-Type':'multipart/form-data'} })

      .map(() => { return true; })
      //.catch((e) => this.handleError(e)); 
  }     
}