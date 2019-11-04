import { TipoUsuario } from './tipo_usuario';
import { Empleado } from './empleado';

export class Usuario{
    public empleado=Empleado.getEmpty();
    public token="";
    constructor(public id,
                public username:string,
                public password:string){

    }

    static getEmpty(){
        return new Usuario(-1,'','');
    }

    setDataFromRequestResponse(data:any){
        //datos de usuario
        this.id=data.usuarios_id;
        this.username=data.username;
        
        //datos personales de empleado
        this.empleado.id=data.personas_id;
        this.empleado.empleadoId=data.empleados_id;
        this.empleado.nombres=data.nombres;
        this.empleado.apellidoPaterno=data.apellido_paterno;
        this.empleado.apellidoMaterno=data.apellido_materno;
        this.empleado.fotoAdjunto=data.foto_adjunto;
        this.empleado.tipoDocumento=data.tipo_documento_id;
        this.empleado.nroIdentificacion=data.nro_identificacion;
        this.empleado.tipoEmpleado=data.tipo_empleado_id;
        this.empleado.fechaNacimiento=data.fecha_nacimiento;

        this.empleado.tipoDocumentoId=data.tipo_documento_id;
        this.empleado.tipoEmpleadoId=data.tipo_empleado_id;
        this.empleado.generoId=data.genero_id;

        //datos de contacto del empleado
        this.empleado.email=data.email;
        this.empleado.telefonos=data.telefonos;

        //datos de locación
        this.empleado.pais=data.pais;
        this.empleado.direccion=data.direccion;
        this.empleado.provincia=data.provincia;
        this.empleado.departamento=data.departamento;
    }

}