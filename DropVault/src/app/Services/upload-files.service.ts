import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AuthentificationService } from '../Services/authentification.service';


@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {
  
  public id;
  public filename;
  public content;
  public res;
  token


  constructor(private http: HttpClient, private authService: AuthentificationService) {
    this.token = this.authService.token
   }

  upload(content: String, filename: String)  {
  var username= this.authService.user
  console.log(username);
  console.log(this.token);
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`}
  
   this.http
        .post('/stock/files', 
        {"filename": filename, "content": content, "username":username}, {headers})
        .subscribe(
          () => {
 
            this.getFiles();
            },
          (error) => {
            console.log('Erreur ! : ' + error);
            }
        );
  }

  getFiles():String[] {
    var username= this.authService.user
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`}
     this.http.get(`/stock/files/${username}`, {headers})
     .subscribe(
      (response) => {
        
        this.filename = response;
        
        },
      (error) => {
        console.log('Erreur ! : ' + error);
        }
     )
     return this.filename
     
  }
  dowload(id : number):string {
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`}
    this.http
  .get(`/stock/download/${id}`,{headers})
  .subscribe(
      (response) => {
      console.log('Fichier téléchargé'); 
      console.log(response);
      this.content = response ["content"];
      console.log(this.content);
      
      },
    (error) => {
      console.log('Erreur ! : ' + error);
      }
    );
    return this.content
  }
  deleteFiles(id : number) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`}
    this.http
  .delete(`/stock/files/${id}`,{headers})
  .subscribe(
      () => {
      console.log('Fichier supprimé'); 
      },
    (error) => {
      console.log('Erreur ! : ' + error);
      }
    );

}
get_id(filename : String):number{
  var username = this.authService.user
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`}
  this.http
  .get(`/stock/file/${filename}`,{headers})
  .subscribe(
      (response) => {
      console.log('id');
      this.res = response;
      },
    (error) => {
      console.log('Erreur ! : ' + error);
      }
    );
    return this.res;

}
echange(content:string, filename :string, user : string){
  const headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${this.token}`}
  
   this.http
        .post('/stock/echange', 
        {"filename": filename, "content": content, "username":user}, {headers})
        .subscribe(
          () => {
 
            this.getFiles();
            },
          (error) => {
            console.log('Erreur ! : ' + error);
            }
        );


}



}
