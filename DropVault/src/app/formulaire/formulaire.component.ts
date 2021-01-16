import { Component, Injectable, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable()

@Component({
  selector: 'DV-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {

  constructor(private HttpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
  console.log(form.value)
  const username = form.value['username']
  const email = form.value['email']
  const password = form.value['password']
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
  
  const headers = { 'Content-Type': 'application/json', 'Referer': '-'}

  /*const httpOptions = {
    headers: new HttpHeaders( { 'Content-Type': 'application/json' } )
  };*/
   
  this.HttpClient
      .post('/prox/api/auth/signup', 
      {"username": username, "email": email, "password":password}, {headers})
      .subscribe(
        () => {
          console.log('Utilisateur enregistré !');
          },
        (error) => {
          console.log('Erreur ! : ' + error);
          }
      );
      this.router.navigate([''])

      /*this.HttpClient.get('/prox/api/ping')
      .subscribe(
        () => {
          console.log('Utilisateur enregistré !');
          },
        (error) => {
          console.log('Erreur ! : ' + error);
          }
      );*/
      
    
  }

  

  
  
}
