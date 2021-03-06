import { GrupoSanguineo } from './grupo_sanguineo';
import { AtencionMedica } from './atencion_medica';

export class FichaMedica{
 public atencionesMedicas:Array<AtencionMedica>;
 public empleadoId:number=-1;
 constructor(public codigo, 
             public tipoResultado:string,
             public resultado:string,
             public adjuntoUrl:string,
             public tipoExamen:string,
             public observaciones:string,
             public fechaEvaluacion:string,
             public grupoSanguineoId:number,
             public grupoSanguineo:GrupoSanguineo=GrupoSanguineo.getEmpty()
             ){

 }

 public static getEmpty(){
    return new FichaMedica('','','','','','','',-1,GrupoSanguineo.getEmpty());
 }

 setDataFromRequestResponse(data:any){
    this.fechaEvaluacion=data.fecha_evaluacion;
    this.codigo=data.id;
    this.tipoResultado=data.tipo_resultado_examen;
    this.tipoExamen=data.tipo_examen;   
    this.observaciones=data.observaciones;
    this.grupoSanguineoId=data.grupo_sanguineo_id;
    this.empleadoId=data.empleados_id;
    this.adjuntoUrl=data.adjunto;
 }

}