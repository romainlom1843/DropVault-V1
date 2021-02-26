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
  contents
  token


  constructor(private http: HttpClient, private authService: AuthentificationService) {
    this.token = this.authService.token
   }

  upload( filename: String, result) {
  var username= this.authService.user
  console.log(username);
  console.log(this.token);
  var id_c
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`}
  
   this.http
        .post('/stock/files', 
        {"filename": filename, "username":username}, {headers})
        .subscribe(
          (response) => {
            id_c =response['id'];
            this.upload_file(result, id_c)
           
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
download(id : number){
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`}
    this.http
  .get(`/stock/download/${id}`,{headers})
  .subscribe(
      () => {
      console.log('Fichier téléchargé'); 
      
      this.content = this.download_content(id);
     
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
      this.delete_content(id)
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
      
      this.res = response;
      },
    (error) => {
      console.log('Erreur ! : ' + error);
      }
    );

    return this.res;

}
upload_file(content, id_c:number){
  const headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${this.token}`}
   this.http
        .post('/stock/upload', 
        {"content": content, "id_c":id_c}, {headers})
        .subscribe(
          () => {
 
            this.getFiles();
            },
          (error) => {
            console.log('Erreur ! : ' + error);
            }
        );


}

delete_content(id){
  const headers = { 'Authorization': `Bearer ${this.token}`}
  this.http
.delete(`/stock/remove/${id}`,{headers})
.subscribe(
    () => {
    console.log('Fichier supprimé'); 
    
    },
  (error) => {
    console.log('Erreur ! : ' + error);
    }
  );

}
download_content(id):string{
  const headers = { 'Content-type':'application/json','Authorization': `Bearer ${this.token}`}
  this.http
.get(`/stock/dwl/${id}`,{headers, responseType:'text'})
.subscribe(
    (response ) => {
    this.contents = response
    
    },
  (error) => {
    console.log('Erreur ! : ' + error);
    }
  );
  return this.contents

}
echange(content, filename :string, user : string){
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
