export class Genero{
    constructor(public id, public nombre:string){

    }

    public static getEmpty(){
        return new Genero('','');
    }
}