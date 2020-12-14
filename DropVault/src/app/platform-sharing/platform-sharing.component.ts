import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

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

}
