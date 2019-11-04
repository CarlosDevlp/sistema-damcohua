import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-input-selector',
  templateUrl: './image-input-selector.component.html',
  styleUrls: ['./image-input-selector.component.scss']
})
export class ImageInputSelectorComponent implements OnInit {

  @Input() label:string="";
  @Input() imgURL:any="";
  @Output() onSelectedFile:EventEmitter<File>=new EventEmitter<File>();
  public imagePath;
  constructor() { }

  ngOnInit() {
  }
 
  preview(files) {
    if (files.length === 0) return;
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
    //output para el componente padre
    this.onSelectedFile.emit(files[0]);
  }

}
