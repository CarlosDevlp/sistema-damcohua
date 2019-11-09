import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-input-selector',
  templateUrl: './file-input-selector.component.html',
  styleUrls: ['./file-input-selector.component.scss']
})
export class FileInputSelectorComponent implements OnInit {
  @Input() label:string="";
  @Input('ver-file-label') verFileLabel:string="";
  @Input() fileURL:any="";
  @Output() onSelectedFile:EventEmitter<File>=new EventEmitter<File>();
  constructor() { }

  ngOnInit() {
  }

  extractFile(files) {
    if (files.length === 0) return;
    var reader = new FileReader();
    let imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      //this.fileURL = reader.result; 
    }
    //output para el componente padre
    this.onSelectedFile.emit(files[0]);
  }

}
