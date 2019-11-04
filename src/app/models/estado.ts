export class Estado{
    constructor(public id, public nombre:string){

    }

    public static getEmpty(){
        return new Estado('','');
    }
}