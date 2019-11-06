// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
export const API_BASE_URL="http://localhost:8888/damcohua-ws/public/api";
export const APP_ID="com.titandevs.sistema-damcohua";
export const STRINGS_VALUES={
  "APP_NAME":"Sistema Damcohua",/**Sistema Damcohua */
  "FOTO_PLACEHOLDER":'assets/images/user.png',
  "API_BASE_URL":API_BASE_URL,
  "API_USUARIO_LOGEAR":API_BASE_URL+'/login#no-token-needed',
  "API_USUARIO_ACTUAL_DATOS":API_BASE_URL+'/me',
  "API_USUARIO_LOGOUT":API_BASE_URL+'/logout',
  "API_USUARIO_ACTUALIZAR_DATOS": (id:number)=>{
    return  API_BASE_URL+'/usuarios/'+id;
  },
  "API_USUARIO_VALIDAR_TOKEN":API_BASE_URL+'/usuarios/validar-token',

  //tipos opciones
  "API_ESTADOS":API_BASE_URL+'/tipos-estado',
  "API_TIPOS_DOCUMENTO":API_BASE_URL+'/tipos-documento',
  "API_TIPOS_EMPLEADO":API_BASE_URL+'/tipos-empleado',
  "API_CLASES_CATEGORIA":API_BASE_URL+'/clases-categoria',
  "API_GENEROS":API_BASE_URL+'/generos',
  "API_GRUPOS_SANGUINEOS":API_BASE_URL+'/grupos-sanguineos',

  //empleados
  "API_EMPLEADOS":API_BASE_URL+'/empleados/usuarios#formdata',
  "API_EMPLEADOS_ELIMINAR":(id:number)=>{
    return API_BASE_URL+'/empleados/usuarios/'+id+'#formdata';
  },
  "API_EMPLEADOS_ACTUALIZAR":(id:number)=>{
    return API_BASE_URL+'/empleados/actualizar/'+id+'#formdata';
  },
  "API_USUARIOS_EMPLEADOS_ACTUALIZAR_DATOS": (id:number)=>{
    return  API_BASE_URL+'/empleados/usuarios/'+id+'/actualizar#formdata';
  },
  "API_EMPLEADO":(id:number)=>{
    return API_BASE_URL+'/empleados/'+id;
  },

  //clientes
  "API_CLIENTES":API_BASE_URL+'/clientes',
  "API_CLIENTES_ACTUALIZAR":(id:number)=>{
    return API_BASE_URL+'/clientes/actualizar/'+id;
  },
  "API_CLIENTE":(id:number)=>{
    return API_BASE_URL+'/clientes/'+id;
  },

  //Local Storage
  "STORAGE_TOKEN": APP_ID+'.token',
  "STORAGE_USER_DATA": APP_ID+'.user_data',

  //errores del servidor
  "ERROR_MESSAGE_DEFAULT":'Error de servidor. Inténtelo más tarde',
}