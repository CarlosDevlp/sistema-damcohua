import { Genero } from './genero';
import { TipoDocumento } from './tipo_documentos';
import { ExamenReglas } from './evaluacion_conduccion';
import { Estado } from './estado';
import { FichaMedica } from './ficha_medica';
import { Persona } from './persona';
import { STRINGS_VALUES } from 'src/environments/environment';

export class Cliente extends Persona{
    public clienteId:number=-1;
    constructor(id, 
                public adjuntoUrl:string,
                public nroLicenciaConducir:string,
                public donacionOrganos:boolean,
                nombres:string,
                apellidoPaterno:string,
                apellidoMaterno:string,
                tipoDocumento:TipoDocumento=TipoDocumento.getEmpty(),
                genero:Genero=Genero.getEmpty(),
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
                public fichaMedica:FichaMedica=null,
                public evaluacionConduccion:ExamenReglas=null,
                public estado:Estado=null
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
        return new Cliente('','','',false,'','','',TipoDocumento.getEmpty(),Genero.getEmpty(),'','','','','','','','',STRINGS_VALUES.FOTO_PLACEHOLDER,'');
    } 
    
    public haTomadoExamen():boolean{
        return this.fichaMedica!=null;
    }

    public setDataFromRequestResponse(data:any){
              
            //datos personales de empleado
             this.id=data.personas_id;
             this.clienteId=data.cliente_id;
             this.nombres=data.nombres;
             this.apellidoPaterno=data.apellido_paterno;
             this.apellidoMaterno=data.apellido_materno;
             this.fotoAdjunto=data.foto_adjunto;
             this.adjuntoUrl=data.adjunto;
             this.tipoDocumento=data.tipo_documento_id;
             this.nroIdentificacion=data.nro_identificacion;
             this.fechaNacimiento=data.fecha_nacimiento;
             this.tipoDocumentoId=data.tipo_documento_id;
             this.generoId=data.genero_id;
             this.estadoCivil=data.estado_civil;

             //datos de contacto del cliente
             this.email=data.email;
             this.telefonos=data.telefonos;
     
             //datos de locación
             this.pais=data.pais;
             this.direccion=data.direccion;
             this.provincia=data.provincia;
             this.departamento=data.departamento;

             //datos de su rol como conductor
             this.nroLicenciaConducir=data.nro_licencia_conducir;
             this.donacionOrganos=data.donacion_organos;
    }
}