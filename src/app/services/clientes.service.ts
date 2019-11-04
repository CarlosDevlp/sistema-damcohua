import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { TipoDocumento } from '../models/tipo_documentos';
import { Genero } from '../models/genero';
import { TiposOpcionesService } from './tipos-opciones.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private clientes:Array<Cliente>;
  public clienteSeleccionado:Cliente;
  private tiposDocumento:Array<TipoDocumento>;
  private generos:Array<Genero>;
  constructor(private tiposOpcionesService:TiposOpcionesService) { 
    this.inicializar();
  }

  private inicializar(){
    this.clienteSeleccionado=Cliente.getEmpty();

    this.clientes=[];
    this.clientes.push(
      new Cliente(1,'assets/images/user.png',
                  '0123456789',
                  false,
                  'Carlos',
                  'Chavez',
                  'Laguna',
                  null,
                  null,
                  'Jr pataz 1344, Los Olivos',
                  'Lima',
                  'Lima',
                  'Perú',
                  '13/10/1994',
                  'carloscl94r@gmail.com',
                  '965124295',
                  '76935184',
                  'assets/images/user.png',
                  'soltero'
                  )
    );

    this.clientes.push(
      new Cliente(2,'assets/images/user.png',
                  '0495456788',
                  true,
                  'Daniel',
                  'Arribasplata',
                  'Soria',
                  null,
                  null,
                  'No sé, Comas',
                  'Lima',
                  'Lima',
                  'Perú',
                  '20/05/1995',
                  'daniel.arribasplata@gmail.com',
                  '991224295',
                  '76635188',
                  'assets/images/user.png',
                  'casado'
                  )
    );
  }
  
  public obtenerClientes():Promise<any>{
    return new Promise<any>((resolve, reject)=>{
      resolve(this.clientes);
    });
  }

  public obtenerCliente(id:string):Promise<any>{
    return new Promise<any>((resolve, reject)=>{
      for(let i in this.clientes){
        if(this.clientes[i].id==id) return resolve(this.clientes[i]);
      }
      reject(-1);
    });
  }

  public eliminarCliente(id):Promise<any>{
    return new Promise<any>((resolve, reject)=>{
      
      for(let i=0;i<this.clientes.length;i++){
        if(this.clientes[i].id==id){
          this.clientes.splice(i,1);
          resolve(this.clientes);
        }
      }
      
    });
  }

}
