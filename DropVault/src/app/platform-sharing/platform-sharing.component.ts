import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

@Injectable()

@Component({
  selector: 'DV-platform-sharing',
  templateUrl: './platform-sharing.component.html',
  styleUrls: ['./platform-sharing.component.css']
})
export class PlatformSharingComponent implements OnInit {

  constructor(private HttpClient: HttpClientModule) { }

  ngOnInit(): void {
  }
  onCreate(){
    /*File = [
      {
        name: 'Machine à laver',
        status: 'éteint'
      },
      {
        name: 'Frigo',
        status: 'allumé'
      },
      {
        name: 'Ordinateur',
        status: 'éteint'
      }
    ] avec un ng for*/
     

  }
  onDelete()
  {

  }
  onUpdate()
  {

  }
  onRead()
  {
    //<li [ngClass]="{'list-group-item': true,

  }

}
