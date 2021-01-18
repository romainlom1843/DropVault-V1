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
      }

}


