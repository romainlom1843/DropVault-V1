import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../Services/authentification.service'
import { HttpClientModule } from '@angular/common/http'

@Injectable()

@Component({
  selector: 'DV-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'
  ]
})
export class SignInComponent implements OnInit {

  authStatus: boolean;

  constructor(private authService: AuthentificationService, private router: Router, private HttpClient: HttpClientModule) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
  }

  onSignIn() {
    this.authService.signIn().then(
      () => {
        console.log('Sign in successful!');
        this.authStatus = this.authService.isAuth;
        this.router.navigate(['accueil/'])
        /* getContactFromServer() {
          this.httpClient
            .get<any[]>('url-base')
            .subscribe(
              (response) => {
                this. = response;
                
              },
              (error) => {
                console.log('Erreur ! : ' + error);
              }
            );*/
      
             }
    );
  }

  onSignOut() {
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
  }

  /*ngOnInit(): void {
  }*/
  onSubmit(form: NgForm){

    const email = form.value['email']
    const pasword = form.value['password']
    }
 
  

}


