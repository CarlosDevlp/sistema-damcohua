import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

declare var $;
@Component({
  selector: 'app-custom-datatable',
  templateUrl: './custom-datatable.component.html',
  styleUrls: ['./custom-datatable.component.scss']
})
export class CustomDatatableComponent implements OnInit, OnDestroy {
  
  dtTrigger= new Subject();
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    language:{
      url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
    }
  };
  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  public render(){
    this.dtTrigger.next();
  }


}
