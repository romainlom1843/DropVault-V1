import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../Services/authentification.service'

@Component({
  selector: 'DV-accueil',
  templateUrl:'./accueil.component.html',
  styleUrls: ['./accueil.component.css'
  ]
})
export class AccueilComponent implements OnInit {

  constructor(private router: Router ) { }

  ngOnInit(): void {
  }
  onclick(){
    this.router.navigate(['auth'])

  }

}
