import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-dialog-content',
  templateUrl: './modal-dialog-content.component.html',
  styleUrls: ['./modal-dialog-content.component.scss']
})
export class ModalDialogContentComponent implements OnInit {

  private titulo="";
  private mensaje="";
  private shouldShow=false;
  private isYesNoForm=false;
  private callbackForYes=()=>{};
  private callbackForNo=()=>{};
  private callbackForOk=()=>{};

  constructor() { }

  ngOnInit() {
  }

  public open(titulo,mensaje, callbackForOk=()=>{}){
    this.titulo=titulo;
    this.mensaje=mensaje;
    this.shouldShow=true;
    this.isYesNoForm=false;
    this.callbackForOk=callbackForOk;
  }

  public openYesNo(titulo:string,mensaje:string):Promise<boolean>{
    this.titulo=titulo;
    this.mensaje=mensaje;
    this.shouldShow=true;
    this.isYesNoForm=true;
    return new Promise<boolean>(
      (resolve,reject)=>{
        this.callbackForNo=reject;
        this.callbackForYes=resolve;
      }
    );
  }

  public yes(){
    if(this.callbackForYes!=null) this.callbackForYes();
    this.close();
  }

  public no(){
    if(this.callbackForNo!=null) this.callbackForNo();
    this.close();
  }

  public ok(){
    if(this.callbackForOk!=null) this.callbackForOk();
    this.close();
  }

  
  close(){
    this.shouldShow=false;
  }

}
