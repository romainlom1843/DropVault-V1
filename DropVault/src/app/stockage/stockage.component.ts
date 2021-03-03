import { Component, Injectable, OnInit } from '@angular/core';
import { AuthentificationService } from '../Services/authentification.service';
import { UploadFilesService } from '../Services/upload-files.service';
import { HttpClient } from '@angular/common/http'


const rust = import("../../../wasm/pkg");

@Injectable()

@Component({
  selector: 'DV-stockage',
  templateUrl: './stockage.component.html',
  styleUrls: ['./stockage.component.css']
})

export class StockageComponent implements OnInit {
  filename 
  listFile 
  listSize
  listType
  key2
  constructor(private uploadService: UploadFilesService, private HttpClient: HttpClient, private authService: AuthentificationService) { }

  ngOnInit(): void {
    this.listFile= this.uploadService.getFiles();
    this.listSize= this.uploadService.getSize();
    this.listType= this.uploadService.getType();
    
  }
  getfiles(){
    this.listSize= this.uploadService.getSize();
    this.listFile= this.uploadService.getFiles();
    console.log(this.listSize)
    this.listType= this.uploadService.getType();
    console.log(this.listType)
  
   
  }


  download(name:string){
    
    var id = this.uploadService.get_id(name);
    var content = this.uploadService.download_content(id)
    this.dechiffrement(content);
  }
  onDelete(name:string){
    var id = this.uploadService.get_id(name);
    this.uploadService.deleteFiles(id);
  }
  keepKey2(event:any){
	  this.key2 = event.target.value;
	  console.log(this.key2);
  }
    
  dechiffrement(content){
    
    rust.then( res => {
      var result = res.decrypt(content, this.key2);
      this.downloadToFile(result, this.filename, 'text/plain')
 
     
     });

  }

  downloadToFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], {type: contentType});
    
    a.href= URL.createObjectURL(file);
    a.download = filename;
    a.click();
  
    URL.revokeObjectURL(a.href);
  };

}
