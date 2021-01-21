import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthentificationService } from '../Services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {
  private baseUrl = '/stock';
  public fileusername = this.authService.filename;

  constructor(private router: Router, private http: HttpClient, private authService: AuthentificationService) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file, `${this.fileusername}-${file.name}`);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    console.log(file.name)

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }

  deleteFiles(file : string) {
    this.http
  .delete(`${this.baseUrl}/files/${file}`)
  .subscribe(
      () => {
      console.log('Fichier supprimé'); 
      },
    (error) => {
      console.log('Erreur ! : ' + error);
      }
    );

}



}
