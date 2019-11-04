export class ClaseCategoria{
    constructor(public id, public nombre:string){

    }

    public static getEmpty(){
        return new ClaseCategoria('','');
    }
}