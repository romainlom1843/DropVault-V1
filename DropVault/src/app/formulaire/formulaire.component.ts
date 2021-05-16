import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthentificationService } from '../Services/authentification.service'

@Injectable()

@Component({
  selector: 'DV-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {

  constructor(private HttpClient: HttpClient, private router: Router, private authservice: AuthentificationService) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
    this.authservice.signUp(form);
    
   
    


 
  }

  
}
