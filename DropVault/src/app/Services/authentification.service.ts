import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable()

export class AuthentificationService {

    token  
    passwd
    public user = String;
    authStatus = false;
    constructor( private router: Router, private HttpClient: HttpClient){}
    signIn(form:NgForm) {
      
      
        const username = form.value['username']
        this.user = username;
        console.log(this.user)
        const password = form.value['password']
        const headers = { 'Content-Type': 'application/json'}
        
        this.HttpClient
      .post('/prox/login', {"username": username, "passwd":password}, {headers})
      .subscribe(
          (response) => {
          this.token = response;
          console.log(this.token);  
          console.log('Utilisateur connecté !');  
          this.authStatus = true;
          this.router.navigate(['upload/']);
          },
        (error) => {
          console.log('Erreur ! : ' + error);
          this.authStatus = false;
          
          }
        );
 
    }
  signUp(form:NgForm){
    console.log(form.value)

    const username = form.value['username']
    const email = form.value['email']
    const password = form.value['password']
  
    const headers = { 'Content-Type': 'application/json', 'Referer': '-'}
  
    this.HttpClient
        .post('/prox/signup', 
        {"username": username, "email": email, "passwd":password}, {headers})
        .subscribe(
          () => {
            console.log('Utilisateur enregistré !');
            },
          (error) => {
            console.log('Erreur ! : ' + error);
            }
        );
        this.router.navigate(['login'])

  }
  KeyDerivation(form:NgForm) {
      
      
    const password = form.value['password']

    const headers = { 'Content-Type': 'application/json'}
    
  this.HttpClient
  .post('/prox/passwd', { "passwd":password}, {headers})
  .subscribe(
      (response) => {
      this.passwd = response;
      console.log(this.passwd);  
      console.log('Password created!');  
      
     
      },
    (error) => {
    
      console.log('Erreur ! : ' + error);

      }
    );

}

}