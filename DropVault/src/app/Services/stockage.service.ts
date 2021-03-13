import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class StockageService {

  filename;
  content;
  res;
  contents
  token
  type 
  size

  constructor(private http: HttpClient, private authService: AuthentificationService, private router:Router) { 
    this.token = this.authService.token
    
  }

  //get file id
get_id(filename : String):number{
    var username = this.authService.user
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`}
    this.http
    .get(`/stock/file/${username}/${filename}`,{headers})
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
  //delete a file by id
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
  // delete content in server
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

  //download a file by id
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
  //download content
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

//get type info
getType():String[] {
  var username= this.authService.user
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`}
   this.http.get(`/stock/type/${username}`, {headers})
   .subscribe(
    (response) => {
      
      this.type = response;
      
      
      },
    (error) => {
      console.log('Erreur ! : ' + error);
      }
   )
   return this.type
   
}
// get name info
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
//get size info
getSize():String[] {
  var username= this.authService.user
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`}
   this.http.get(`/stock/size/${username}`, {headers})
   .subscribe(
    (response) => {
      
      this.size = response;
      
      
      },
    (error) => {
      console.log('Erreur ! : ' + error);
      }
   )
   return this.size
   
}

}
