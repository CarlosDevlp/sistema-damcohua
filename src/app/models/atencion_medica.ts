export class AtencionMedica{
    constructor(
        public id,
        public fechaAtencion:string,
        public medico:string
    ){

    }

    public static getEmpty(){
        return new AtencionMedica('','','');
    }
}