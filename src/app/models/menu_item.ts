export class MenuItem{
    constructor(public label, public url, public icono,public subMenuItems=[]){
    }

    hasSubMenuItems(){
        return this.subMenuItems.length>0;
    }
}