import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class EchangeService {

  token
  constructor(private http: HttpClient, private authService: AuthentificationService, private router: Router) {
    this.token = this.authService.token
  }

 /* upload(pubkey, username) {
    
   

    var id_c
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` }

    this.http
      .post('/change/pubkey',
        { "pubkey": pubkey, "username": username }, { headers })
      .subscribe(
        (response) => {
          id_c = response['id'];


        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }*/
}
