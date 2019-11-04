export class GrupoSanguineo{
    constructor(public id, public nombre:string){

    }
    public static getEmpty(){
        return new GrupoSanguineo('','');
     }
}