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
  constructor(private uploadService: UploadFilesService, private HttpClient: HttpClient, private authService: AuthentificationService,  private stockService: StockageService) { 

  }

  ngOnInit(): void {
    this.listFile= this.stockService.getFiles();
    this.listSize= this.stockService.getSize();
    this.listType= this.stockService.getType();
    
  }
  getfiles(){
    this.listSize= this.stockService.getSize();
    this.listFile= this.stockService.getFiles();
    this.listType= this.stockService.getType();


  }


download(name:string){
    
    var id =  this.stockService.get_id(name);
    console.log(id)
    var content = this.stockService.download_content(id)
    this.dechiffrement(content, name);
  }
 onDelete(name:string){
    var id = this.stockService.get_id(name);
    console.log(id)
   this.stockService.deleteFiles(id);
  }
  keepKey2(event:any){
	  this.key2 = event.target.value;
	  console.log(this.key2);
  }
    
  dechiffrement(content, filename){
    
    rust.then( res => {
      var result = res.decrypt(content, this.key2);
      this.downloadToFile(result, filename, 'text/plain')
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
