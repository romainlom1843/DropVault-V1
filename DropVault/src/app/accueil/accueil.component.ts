import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../Services/authentification.service'

@Component({
  selector: 'DV-accueil',
  templateUrl:'./accueil.component.html',
  styleUrls: ['./accueil.component.css'
  ]
})
export class AccueilComponent implements OnInit {

  constructor(private authservice: AuthentificationService) { }

  ngOnInit(): void {
  }

}
