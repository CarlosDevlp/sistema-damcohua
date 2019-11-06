import { TipoDocumento } from '../models/tipo_documentos';
import { Genero } from '../models/genero';

export class Persona{
    public tipoDocumentoId:number=-1;
    public generoId:number=-1;

    constructor(public id, 
                public nombres:string,
                public apellidoPaterno:string,
                public apellidoMaterno:string,
                public tipoDocumento:TipoDocumento,
                public genero:Genero,
                public direccion:string,
                public provincia:string,
                public departamento:string,
                public pais:string,
                public fechaNacimiento:string,
                public email:string,
                public telefonos:string,
                public nroIdentificacion:string,
                public fotoAdjunto:string,
                public estadoCivil:string){
    }

    public getNombreCompleto():string{
        return this.nombres+' '+this.apellidoPaterno+' '+this.apellidoMaterno;
    }
}