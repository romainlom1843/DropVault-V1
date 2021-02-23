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
  


  constructor(private http: HttpClient, private authService: AuthentificationService) { }

  upload(content: String, filename: String)  {
  var username= this.authService.user
  console.log(username);
  const headers = { 'Content-Type': 'application/json'}
  
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
     this.http.get(`/stock/files/${username}`)
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
    this.http
  .get(`/stock/download/${id}`)
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
    this.http
  .delete(`/stock/files/${id}`)
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
  this.http
  .get(`/stock/file/${filename}`)
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
  const headers = { 'Content-Type': 'application/json'}
  
   this.http
        .post('/stock/files', 
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
