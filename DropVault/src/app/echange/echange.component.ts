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
  filename2 
  selectedFile2 
  text2
  user
  length
  type
  key3
 
  constructor(private uploadService: UploadFilesService, private HttpClient: HttpClient, private authService: AuthentificationService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    
  }
  chiffrement_echange(){
    
    rust.then( res => {
      var result = res.encrypt(this.text2, this.key3);
      console.log(result);
      this.uploadService.echange(result, this.filename2, this.user);
     });
}
keepKey3(event:any){
  this.key3 = event.target.value;
}
keepUser(event:any){
  this.user =event.target.value;
}
keepFile2(event:any){
  this.filename2 = event.target.files[0].name;
  this.length = event.target.files[0].length;
  console.log(this.length)
  this.selectedFile2 = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
  this.text2 = reader.result.toString().trim();
  }
  reader.readAsText(this.selectedFile2);
}
}
