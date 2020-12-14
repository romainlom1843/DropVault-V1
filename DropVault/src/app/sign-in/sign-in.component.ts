import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable()

@Component({
  selector: 'DV-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'
  ]
})
export class SignInComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm){

    const email = form.value['email']
    const pasword = form.value['password']
    }

}
