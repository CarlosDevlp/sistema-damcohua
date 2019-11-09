import { Empleado } from './empleado';
import { ClaseCategoria } from './clase_categoria';

export class ExamenReglas{
    public claseCategoriaId:number=-1;
    public empleadoId:number=-1;
    constructor(
        public id,
        public servicioSolicitado:string,
        public nroReciboOperacion:string,
        public claseCategoria:ClaseCategoria=ClaseCategoria.getEmpty(),
        public fechaEvaluacion:string,
        public restricciones:string,
        public observaciones:string,
        public empleado:Empleado=Empleado.getEmpty(),
        public adjuntoUrl:string,
        ){

    }

    public static getEmpty(){
        return new ExamenReglas('','','',ClaseCategoria.getEmpty(),'','','',Empleado.getEmpty(),'');
    }

    setDataFromRequestResponse(data:any){
        this.fechaEvaluacion=data.fecha_evaluacion;
        this.id=data.id;
        this.servicioSolicitado=data.servicio_solicitado;
        this.nroReciboOperacion=data.nro_recibo_operacion;   
        this.claseCategoriaId=data.clase_categoria_id;
        this.observaciones=data.observaciones;
        this.restricciones=data.restricciones;
        this.empleadoId=data.empleados_id;
        this.adjuntoUrl=data.adjunto;
    }
}