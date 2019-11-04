import { TipoOpcion } from './tipo_opcion';
export class TipoEmpleado implements TipoOpcion{
    constructor(public id, public nombre:string){

    }

    public static getEmpty(){
        return new TipoEmpleado('','');
    }
}