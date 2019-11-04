import { TipoEmpleado } from './tipo_empleado';
import { TipoDocumento } from './tipo_documentos';
import { Genero } from './genero';
import { Persona } from './persona';

export class Empleado extends Persona{
    public tipoEmpleadoId:number;
    public empleadoId:number;
    constructor(id, 
                nombres:string,
                apellidoPaterno:string,
                apellidoMaterno:string,
                tipoDocumento:TipoDocumento,
                genero:Genero,
                direccion:string,
                provincia:string,
                departamento:string,
                pais:string,
                fechaNacimiento:string,
                email:string,
                telefonos:string,
                nroIdentificacion:string,
                fotoAdjunto:string,
                estadoCivil:string,
                public tipoEmpleado:TipoEmpleado
                ){
        super(id,
            nombres,
            apellidoPaterno,
            apellidoMaterno,
            tipoDocumento,
            genero,
            direccion,
            provincia,
            departamento,
            pais,
            fechaNacimiento,
            email,
            telefonos,
            nroIdentificacion,
            fotoAdjunto,
            estadoCivil);
    }

    public static getEmpty(){
        return new Empleado(-1,'','','',TipoDocumento.getEmpty(),Genero.getEmpty(),'','','','','','','','','','',TipoEmpleado.getEmpty());
    }
}