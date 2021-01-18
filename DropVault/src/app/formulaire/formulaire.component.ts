import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
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
