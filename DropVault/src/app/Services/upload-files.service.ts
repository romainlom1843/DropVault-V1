import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthentificationService } from '../Services/authentification.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  public id;
  public filename;
  public content;
  public res;
  contents
  token
  type
  size


  constructor(private http: HttpClient, private authService: AuthentificationService, private router: Router) {
    this.token = this.authService.token
  }

  upload(filename: String, result, length, type) {
    var username = this.authService.user
    console.log(username);
    console.log(this.token);
    var id_c
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` }

    this.http
      .post('/stock/files',
        { "filename": filename, "username": username, "sizing": `${length}`, "ext": type }, { headers })
      .subscribe(
        (response) => {
          id_c = response['id'];
          this.upload_file(result, id_c)

        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );


  }

  upload_file(content, id_c: number) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    this.http
      .post(`/stock/upload/${id_c}`,
        { "content": content }, { headers })
      .subscribe(
        () => {

        },
        (error) => {
          alert("Votre fichier a été téléversé sur la plateforme")
          this.router.navigate(['/archive']);
        }
      );


  }


  echange(content, filename: string, user: string, length, type) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` }

    this.http
      .post('/stock/echange',
        { "filename": filename, "content": content, "username": user, "sizing": `${length}`, "ext": type }, { headers })
      .subscribe(
        () => {

        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );


  }

  upload_chunk(filename: String, result, length, type) {
    var username = this.authService.user
    console.log(username);
    console.log(this.token);
    var id_c
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` }

    this.http
      .post('/stock/files',
        { "filename": filename, "username": username, "sizing": `${length}`, "ext": type }, { headers })
      .subscribe(
        (response) => {
          id_c = response['id'];
          this.upload_file(result, id_c)

        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );


  }



  upload_big(filename: String, length, type) {
    var username = this.authService.user
    console.log(username);
    console.log(this.token);
    var id_c
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` }

    this.http
      .post('/stock/files',
        { "filename": filename, "username": username, "sizing": `${length}`, "ext": type }, { headers })
      .subscribe(
        (response) => {



        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );


  }
}