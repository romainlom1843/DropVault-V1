import { Component, Injectable, OnInit } from '@angular/core';
import { AuthentificationService } from '../Services/authentification.service';
import { UploadFilesService } from '../Services/upload-files.service';
import { HttpClient } from '@angular/common/http'
import { StockageService } from '../Services/stockage.service';
import { identity } from 'rxjs';


const rust = import("../../../wasm/pkg");

@Injectable()

@Component({
  selector: 'DV-stockage',
  templateUrl: './stockage.component.html',
  styleUrls: ['./stockage.component.css']
})

export class StockageComponent implements OnInit {

  listFile
  listSize
  listType
  key2
  result
  resulttot
  constructor(private uploadService: UploadFilesService, private HttpClient: HttpClient, private authService: AuthentificationService, private stockService: StockageService) {

  }

  ngOnInit() {
    this.stockService.getFiles().subscribe((response) => this.listFile = response);
    this.stockService.getSize().subscribe((response) => this.listSize = response);
    this.stockService.getType().subscribe((response) => this.listType = response);
  }
  actualise() {
    this.stockService.getFiles().subscribe((response) => this.listFile = response);
    this.stockService.getSize().subscribe((response) => this.listSize = response);
    this.stockService.getType().subscribe((response) => this.listType = response);

  }

  download(name: string) {

    this.result = this.stockService.get_id(name).subscribe(
      id => this.stockService.download_key(id).subscribe(
        key => this.dechiffrement_key(key))
    )
    var result2 = this.stockService.get_id(name).subscribe(
      id => this.stockService.download_content(id).subscribe(
        content => this.dechiffrement(content, name)
      )
    )

  }

  onDelete(name: string) {
    var id = this.stockService.get_id(name).subscribe(
      id => this.stockService.deleteFiles(id)
    )
  }

  keepKey2(event: any) {
    this.key2 = event.target.value;
    console.log(this.key2);
  }

  dechiffrement_key(key) {

    rust.then(res => {
      console.log(key);
      console.log(this.authService.passwd.slice(51, 83))
      this.result = res.decrypt(key, this.authService.passwd.slice(51, 83))
      console.log(this.result)

    });

  }
  dechiffrement(content, filename) {
    console.log(content)
   // var iteration = Math.trunc(content.length / 5120);
    //console.log(iteration)
    //console.log(this.result)
   

    rust.then(res => {
      //for (var i = 0; i < iteration; i++) {
        //console.log(i)
        //console.log(content.slice(5120* i, 5120 * (i + 1)))
        console.log(this.result)
        var result2 = res.decrypt(content/*.slice(5120 * i, 5120* (i + 1))*/, this.result);
        console.log(result2)
        //this.resulttot.concat(result2)
       // console.log(this.resulttot)
     // }
      this.downloadToFile(result2, filename, 'text/plain')// modify 
    });


  }
  downloadToFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  };

}
