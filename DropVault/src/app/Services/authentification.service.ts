import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable()

export class AuthentificationService {

    token = String; 
    filename = String;
    authStatus = false;
    constructor( private router: Router, private HttpClient: HttpClient)
    {
    }
    signIn(form:NgForm) {
      
     
        const username = form.value['username']
        this.filename= username;
        const pasword = form.value['password']
        const headers = { 'Content-Type': 'application/json'}
        console.log('Sign in successful!');
        this.HttpClient
      .post('/prox/api/auth/login', {"username_or_email": username, "password":pasword}, {headers})
      .subscribe(
          (response) => {
          this.token = response['data']['token'];
          console.log('Utilisateur connecté !'); 
          console.log(this.token); 
          this.authStatus = true;
          this.router.navigate(['accueil/']);
          },
        (error) => {
          console.log('Erreur ! : ' + error);
          this.authStatus = false;
          
          }
        );
 
    }

    signOut() {
      console.log(this.token);
      const headers = { 'Content-Type': 'application/json', 'Authorization': `bearer ${this.token}`}
      console.log('Logout successful!');
      this.HttpClient
    .post('/prox/api/auth/logout', {}, {headers})
    .subscribe(
        () => {
        console.log('Utilisateur déconnecté!'); 
        this.authStatus = false;
        this.router.navigate(['']);
        },
      (error) => {
        console.log('Erreur ! : ' + error);
        this.authStatus = true;
      
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

  }

}