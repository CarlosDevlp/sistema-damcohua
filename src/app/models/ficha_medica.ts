import { GrupoSanguineo } from './grupo_sanguineo';
import { AtencionMedica } from './atencion_medica';

export class FichaMedica{
 public atencionesMedicas:Array<AtencionMedica>;
 constructor(public codigo, 
             public tipoResultado:string,
             public resultado:string,
             public adjuntoUrl:string,
             public tipoExamen:string,
             public observaciones:string,
             public fechaEvaluacion:string,
             public grupoSanguineoId:string,
             public grupoSanguineo:GrupoSanguineo=GrupoSanguineo.getEmpty()
             ){

 }

 public static getEmpty(){
    return new FichaMedica('','','','','','','','',GrupoSanguineo.getEmpty());
 }
}