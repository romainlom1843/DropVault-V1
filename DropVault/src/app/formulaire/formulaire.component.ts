import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'DV-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
  const name = form.value['name']
  const surname = form.value['surname']
  const email = form.value['email']
  const tel = form.value['tel']
  const pasword = form.value['password']
  }

}
