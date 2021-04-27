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

  upload(filename: String, result, result2, length, type) {
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
          this.upload_file(result, result2, id_c)

        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );


  }

  upload_file(content, key, id_c: number) {

    console.log(content.length)
    var iteration = Math.trunc(content.length/5000);
    console.log(iteration)
    for (var i = 0; i< iteration; i++) {
      console.log(i);
    
      const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` }
      this.http
        .post(`/stock/upload/${id_c}`, { "content": `${content.slice(i * 5000, (i + 1) * 5000)}`, "key": `${key}` }/*, formData,*/, { headers })
        .subscribe(
          () => {

          },
          (error) => {
          console.log("Morceau téléversé sur la plateforme")
            this.router.navigate(['/archive']);
          }
        );
    }
    console.log(content.length)
    console.log(iteration)
    var reste = content.slice(iteration * 5000, content.length)
    console.log(reste.length)
 
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    this.http
      .post(`/stock/upload/${id_c}`, { "content": `${content.slice((iteration) * 5000, content.length)}`, "key": `${key}` }/*, formData,*/, { headers })
      .subscribe(
        () => {

        },
        (error) => {
          console.log("ici");
        alert("Votre fichier a été téléversé sur la plateforme")
          this.router.navigate(['/archive']);
        }
      );


  }


  echange(content, key, filename: string, user: string, length, type) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    var id_p
    this.http
      .post('/stock/echange',
        { "filename": filename, "content": content, "username": user, "sizing": `${length}`, "ext": type }, { headers })
      .subscribe(
        (response) => {
          id_p = response['id'];
          this.exchange_file(content, key, id_p)

        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );


  }
  exchange_file(content, key, id_p) {

    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    // const formData : FormData = new FormData();
    // formData.append('content', content);
    // console.log(content);
    //console.log(formData);
    this.http
      .post(`/stock/exchange/${id_p}`, { "content": `${content}`, "key": `${key}` }/*, formData,*/, { headers })
      .subscribe(
        () => {

        },
        (error) => {
          alert("Votre fichier a été échangé avec un autre utilisateur")
          this.router.navigate(['/archive']);
        }
      );

  }

}