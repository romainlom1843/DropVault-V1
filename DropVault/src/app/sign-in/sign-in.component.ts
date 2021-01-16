import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../Services/authentification.service'
import { HttpClient } from '@angular/common/http'


@Injectable()

@Component({
  selector: 'DV-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'
  ]
})
export class SignInComponent implements OnInit {

  authStatus: boolean;

  constructor(private authService: AuthentificationService, private router: Router, private HttpClient: HttpClient) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
  }

  onSignIn(form:NgForm) {
    this.authService.signIn().then(
      () => {
        const username = form.value['username']
        const pasword = form.value['password']
        const headers = { 'Content-Type': 'application/json', 'Referer': '-'}
        console.log('Sign in successful!');
        this.HttpClient
      .post('/prox/api/auth/login', {"username_or_email": username, "password":pasword}, {headers})
      .subscribe(
          () => {
          console.log('Utilisateur connecté !');
          this.router.navigate(['accueil/']);
          this.authStatus = this.authService.isAuth;
          },
        (error) => {
          console.log('Erreur ! : ' + error);
          this.router.navigate(['']);
          }
        );
      }
    );
  }
}


