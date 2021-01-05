import { Component, Injectable, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http'

@Injectable()

@Component({
  selector: 'DV-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {

  constructor(private HttpClient: HttpClient) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
  console.log(form.value)
  const name = form.value['name']
  const surname = form.value['surname']
  const email = form.value['email']
  const tel = form.value['tel']
  const pasword = form.value['password']
  /*this.HttpClient
      .put('https://dropvault-v1.appspot.com', name)
      .subscribe(
          () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );*/
  
  const headers = { 'content-type': 'application/json'}
   
  this.HttpClient
      .post('http://localhost:4200/api/users', { "first_name": name, "last_name": surname, "email": email, "tel": tel, "pwd":pasword},{'headers':headers})
      .subscribe(
          () => {
          console.log('Fichier téléchargé !');
          },
        (error) => {
          console.log('Erreur ! : ' + error);
          }
      );
  
  }

  saveContactToServer()
  {
   /* this.HttpClient
      .put('https://dropvault-v1.appspot.com', this.onSubmit)
      .subscribe(
          () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );*/
    
  }

}
