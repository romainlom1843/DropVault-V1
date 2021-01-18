import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../Services/authentification.service'
import { HttpClient } from '@angular/common/http';



@Injectable()

@Component({
  selector: 'DV-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'
  ]
})
export class SignInComponent implements OnInit {

  constructor( private router: Router, private HttpClient: HttpClient, private authservice: AuthentificationService) { }

  ngOnInit() {
  }

  onSignIn(form:NgForm) {
     this.authservice.signIn(form);

        /*const username = form.value['username']
        const pasword = form.value['password']
        const headers = { 'Content-Type': 'application/json', 'Referer': '-'}
        console.log('Sign in successful!');
        this.HttpClient
      .post('/prox/api/auth/login', {"username_or_email": username, "password":pasword}, {headers})
      .subscribe(
          () => {
          console.log('Utilisateur connecté !');
          this.authStatus = true;
          this.router.navigate(['accueil/']);
          },
        (error) => {
          console.log('Erreur ! : ' + error);
          this.authStatus = false;
          //this.router.navigate(['']);
          }
        );*/
      }
  onSignOut(){
    this.authservice.signOut();
  }
}


