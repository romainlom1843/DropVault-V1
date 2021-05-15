import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../Services/authentification.service'
import { HttpClient } from '@angular/common/http';
import { EchangeService } from '../Services/echange.service';

const rust = import("../../../wasm/pkg");

@Injectable()

@Component({
  selector: 'DV-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'
  ]
})
export class SignInComponent implements OnInit {
  passwd
  pubkey
  secret
  
  constructor( private router: Router, private HttpClient: HttpClient, private authservice: AuthentificationService, private echangeService: EchangeService) { }

  ngOnInit() {
  }

  onSignIn(form:NgForm) {
     this.authservice.signIn(form);
     this.authservice.KeyDerivation(form);
     this.Create_public_key()
     
     
     
     
     
      }
      Create_public_key() {
       
        rust.then(res => {
          this.secret=res.create_secret();
          console.log('secret' + this.secret)
          console.log(this.secret)
          this.pubkey = res.create_pub_key(this.secret);
          
          console.log('pub key' + this.pubkey)
          console.log(this.authservice.user)
          this.echangeService.upload_pub(this.pubkey, this.authservice.user,this.secret)
          
          
        });
       
        
      }

}


