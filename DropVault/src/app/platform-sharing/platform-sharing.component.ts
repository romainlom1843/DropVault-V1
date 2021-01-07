import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient , HttpEventType, HttpResponse } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { NgForm } from '@angular/forms';
import { EnvoiFichierService } from '../Services/envoi-fichier.service';
import { UploadFilesService } from '../Services/upload-files.service';
import { Observable } from 'rxjs';

@Injectable()

@Component({
  selector: 'DV-platform-sharing',
  templateUrl: './platform-sharing.component.html',
  styleUrls: ['./platform-sharing.component.css']
})
export class PlatformSharingComponent implements OnInit {

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;

  constructor(private uploadService: UploadFilesService, private HttpClient: HttpClient, private envoiFichierService: EnvoiFichierService ) { }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }
  
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  
  upload(): void {
    this.progress = 0;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.currentFile = file;
  
        this.uploadService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
  
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
  
            this.currentFile = undefined;
          });
      }
  
      this.selectedFiles = undefined;
    }
  }


  /*onSubmit(form: NgForm){
   const headers = { 'content-type': 'application/json'}
   const depot= form.value['depot'] 
   const quantity =1
   

   
    this.HttpClient
      .post('http://localhost:4200/api/api2/files/', { "name":depot},{'headers':headers})
      .subscribe(
          () => {
          console.log('Fichier téléchargé !');
          },
        (error) => {
          console.log('Erreur ! : ' + error);
          }
      );                  
  }

  onList(){
    console.log('success')
    this.HttpClient
    .get('http://localhost:4200/api/api2/files/test.txt/')
    .subscribe(
      () => {
      console.log('Fichier téléchargé !');
      },
    (error) => {
      console.log('Erreur ! : ' + error);
      }
  );
  }*/
 /*
  //Variable contenant le fichier à envoyer (elle doit avoir une valeur par défaut)
  fichierAEnvoyer: File = null;
  //Fonction qui récupère le fichier pour l'ajouter à la variable
  //Elle est appelée lors d'un changement sur l'input du fichier
  //S'il y a plusieurs fichiers, il faudra adapter le code avec une variable de type "FileList" et parcourir la liste de fichiers avec une boucle.
  envoiFichier (fichiers: FileList) {
      this.fichierAEnvoyer = fichiers.item(0);
  }
  //Fonction qui va lier l'attribut au service qui envoie le fichier au site ou à l'API. On utilise pour cela le système de souscription issue de la programmation réactive
  envoiFichierParLeService() {
      this.envoiFichierService.postFile(this.fichierAEnvoyer).subscribe(
        resultat => {
          console.log("Success du telechargement");
        }, erreur => {
          console.log("Erreur lors de l'envoi du fichier : ", erreur);
        });
  }                 */
}