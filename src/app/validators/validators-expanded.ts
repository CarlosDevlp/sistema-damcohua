import { Validators, FormControl } from '@angular/forms';

export class ValidatorsExpanded{
    /**
     * Validador que determina si se ha ingresado solo texto en un campo
     */
    public static validadQueSeaSoloTexto=Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚ ]*');
    
    /**
     * Validador que determina que el valor ingresado solo sea númerico
     */
    public static validadQueSeaNumero=Validators.pattern('[0-9]*');  
    
    /**
     * Validador que examina si se ha seleccionado al menos una opción en un select
     * @param control 
     */
    public static validarQueHayaSeleccionadoUnaOpcion(control: FormControl):any{
        if(control.value==-1) return {'debe selecciona una opcion':true};
        return null;
    } 

    /**
     * Validador que examina si el campo está vacío
     * @param control 
     */
    public static validarSiElCampoEstaVacio(control: FormControl):any{
        if(! control.value.trim()) return {'el campo no puede estar vacío':true};
        return null;
    }
}