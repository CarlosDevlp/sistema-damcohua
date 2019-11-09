import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalDialogContentComponent } from './modal-dialog-content/modal-dialog-content.component';
import { ImageInputSelectorComponent } from './image-input-selector/image-input-selector.component';
import { CustomDatatableComponent } from './custom-datatable/custom-datatable.component';
import { DataTablesModule } from 'angular-datatables';
import { SimpleClienteDataCardComponent } from './simple-cliente-data-card/simple-cliente-data-card.component';
import { FileInputSelectorComponent } from './file-input-selector/file-input-selector.component';

@NgModule({
  declarations: [
    ImageInputSelectorComponent,
    CustomDatatableComponent,
    SimpleClienteDataCardComponent,
    FileInputSelectorComponent
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    DataTablesModule
  ],
  exports: [
    ImageInputSelectorComponent,
    CustomDatatableComponent,
    SimpleClienteDataCardComponent,
    FileInputSelectorComponent
  ]
})
export class ComponentsModule {}