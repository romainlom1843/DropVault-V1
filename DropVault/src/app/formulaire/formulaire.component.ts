import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

@Injectable()

@Component({
  selector: 'DV-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {

  constructor(private HttpClient: HttpClientModule) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
  const name = form.value['name']
  const surname = form.value['surname']
  const email = form.value['email']
  const tel = form.value['tel']
  const pasword = form.value['password']
  }

  saveContactToServer()
  {
   /* this.HttpClient
    .post('https://serveur-adresse/contact.json', this.onSubmit)
    .subscribe(
      next: () =>

    )*/
  }

}
