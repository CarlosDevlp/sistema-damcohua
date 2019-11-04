import { TipoOpcion } from './tipo_opcion';
export class TipoUsuario implements TipoOpcion{
    constructor(public id, public nombre:string){
    }

    public static getEmpty(){
        return new TipoUsuario('','');
    }
}