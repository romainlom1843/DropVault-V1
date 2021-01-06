import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { NgForm } from '@angular/forms';

@Injectable()

@Component({
  selector: 'DV-platform-sharing',
  templateUrl: './platform-sharing.component.html',
  styleUrls: ['./platform-sharing.component.css']
})
export class PlatformSharingComponent implements OnInit {

  constructor(private HttpClient: HttpClient) { }

  ngOnInit(): void {
  }
  
  onSubmit(form: NgForm){

   const depot= form.value['depot'] 
   const quantity =1
   const headers = { 'content-type': 'application/json'}
   
    this.HttpClient
      .post('http://localhost:4200/api/api2/files/', { "name":depot},{'headers':headers})
      .subscribe(
          () => {
          console.log('Fichier téléchargé !');
          },
        (error) => {
          console.log('Erreur ! : ' + error);
          }
      );
                    
}

  onList(){
    console.log('success')
    this.HttpClient
    .get('http://localhost:4200/api/api2/files/test.txt/')
    .subscribe(
      () => {
      console.log('Fichier téléchargé !');
      },
    (error) => {
      console.log('Erreur ! : ' + error);
      }
  );
  }
}