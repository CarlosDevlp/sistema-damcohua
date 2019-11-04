import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-simple-cliente-data-card',
  templateUrl: './simple-cliente-data-card.component.html',
  styleUrls: ['./simple-cliente-data-card.component.scss']
})
export class SimpleClienteDataCardComponent implements OnInit {
  @Input() cliente:Cliente=Cliente.getEmpty();
  constructor() { }

  ngOnInit() {
  }

}
