import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

const rust = import("../../../wasm/pkg");

@Injectable()

export class AuthentificationService {

    token  
    passwd
    hash_pass

    public user = String;
    authStatus = false;
    
    constructor( private router: Router, private HttpClient: HttpClient){}
    
    signIn(form:NgForm) {
      
      
        const username = form.value['username']
        this.user = username;
        console.log(this.user)
        const password = form.value['password']
        rust.then( res => {
          this.hash_pass = res.derive_passwd(password);
          console.log(this.hash_pass);
          console.log(this.hash_pass.slice(40,72))
          const headers = { 'Content-Type': 'application/json'}
        
          this.HttpClient
        .post('/prox/login', {"username": username, "passwd":this.hash_pass.slice(40,72)}, {headers})
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
        });

 
    }
  signUp(form:NgForm){

    const username = form.value['username']
    const email = form.value['email']
    const password = form.value['password']
    rust.then( res => {
      this.hash_pass = res.derive_passwd(password);
      console.log(this.hash_pass);
      console.log(this.hash_pass.slice(40,72))

    const headers = { 'Content-Type': 'application/json', 'Referer': '-'}
    this.HttpClient
        .post('/prox/signup', 
        {"username": username, "email": email, "passwd":this.hash_pass.slice(40,72)}, {headers})
        .subscribe(
          () => {
            console.log('Utilisateur enregistré !');
            },
          (error) => {
            console.log('Erreur ! : ' + error);
            }
        );
        this.router.navigate(['login'])
    });
  

  }
  KeyDerivation(form:NgForm) {
      
      
    const password = form.value['password']
    rust.then( res => {
      this.passwd = res.derive_key(password);
      console.log(this.passwd);
      console.log(this.passwd.slice(40,72))
    });

    
 

}

}