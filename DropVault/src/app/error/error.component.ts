import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'DV-error',
  template: `
  <h2>Erreur 404</h2>
<p>La page que vous cherchez n'existe pas !</p>

  `,
  styles: [
  ]
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
