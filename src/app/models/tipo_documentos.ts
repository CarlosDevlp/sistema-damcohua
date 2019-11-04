import { TipoOpcion } from './tipo_opcion';

export class TipoDocumento implements TipoOpcion{
    constructor(public id, public nombre:string){

    }

    public static getEmpty(){
        return new TipoDocumento('','');
    }
}