import { Empleado } from './empleado';
import { ClaseCategoria } from './clase_categoria';

export class EvaluacionConduccion{
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
        return new EvaluacionConduccion('','','',ClaseCategoria.getEmpty(),'','','',Empleado.getEmpty(),'');
    }
}