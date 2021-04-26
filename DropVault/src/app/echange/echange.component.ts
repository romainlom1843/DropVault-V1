import { Component, Injectable, OnInit } from '@angular/core';
import { AuthentificationService } from '../Services/authentification.service';
import { UploadFilesService } from '../Services/upload-files.service';
import { HttpClient } from '@angular/common/http'
import { NgForm } from '@angular/forms';

const rust = import("../../../wasm/pkg");
@Injectable()
@Component({
  selector: 'DV-echange',
  templateUrl: './echange.component.html',
  styleUrls: ['./echange.component.css']
})



export class EchangeComponent implements OnInit {
  filename
  selectedFile
  text
  user
  length
  type
  key

  constructor(private uploadService: UploadFilesService, private HttpClient: HttpClient, private authService: AuthentificationService) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {

  }
  chiffrement_echange() {

    if(this.length <5000000)
    {
	    rust.then( res => {
        console.log(this.text)
        console.log(this.key)
	      var result = res.encrypt(this.text, this.key);
        console.log(result);
        
        var result2 = res.diffie_hellman(this.key)
        console.log(result2);
	      this.uploadService.echange( result,result2, this.filename,this.user, this.length, this.type);       
	     });
    }
  }
  keepKey3(event: any) {
    this.key = event.target.value;
  }
  keepUser(event: any) {
    this.user = event.target.value;
  }
  keepFile2(event: any) {
    this.filename = event.target.files[0].name;
    this.length = event.target.files[0].size;
    this.type = event.target.files[0].type;
    this.selectedFile = event.target.files[0];


    var accept = {
      binary: ["image/png", "image/jpeg"],
      text: ["text/plain", "text/css", "application/xml", "text/html"]
    };

    if (this.length < 5000000) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.text = reader.result.toString().trim();
      }
      reader.readAsText(this.selectedFile);
    }
    else {
      alert("Votre fichier est trop grand");
    }
  }
}
