import { Genero } from './genero';
import { TipoDocumento } from './tipo_documentos';
import { EvaluacionConduccion } from './evaluacion_conduccion';
import { Estado } from './estado';
import { FichaMedica } from './ficha_medica';
import { Persona } from './persona';
import { STRINGS_VALUES } from 'src/environments/environment';

export class Cliente extends Persona{
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
                public evaluacionConduccion:EvaluacionConduccion=null,
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
}