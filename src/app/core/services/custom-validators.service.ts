import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorsService {
  constructor() {}
  isValidField(form: FormGroup, field: string, nameError = ''): boolean | null{
    if (nameError !== '') {
      return form.controls[field].errors?.[nameError] && form.controls[field].touched;
    }
    return form.controls[field].errors && form.controls[field].touched;
  }
  getFieldError(form: FormGroup, field: string): string | null {
    const control = form.get(field);
    if (!control) {
      return null;
    }
    const errors = control.errors || {};

    if (!control.invalid && control.touched) {
      return null;
    }
    if (errors['required']) {
      return 'Campo requerido';
    }
    if (control.errors?.minlength) {
      const minLengthError = control.errors['minlength'];
      return `Campo requerido con tamaño mínimo de ${minLengthError.requiredLength} caracteres.`;
    }

    if (control.errors?.maxlength) {
      const maxLengthError = control.errors.maxlength;
      return `Campo requerido con tamaño máximo de ${maxLengthError.requiredLength} caracteres.`;
    }

    if (control.errors?.notEqual) {
      return 'Los campos de contraseña no coinciden.';
    }
    if (control.errors?.porcentajeInvalido) {
      return 'El campo debe ser un número entre 0 y 100, con hasta dos decimales opcionales.';
    }
    if (control.errors?.validateFechas) {
      return 'La fecha de inicio no puede ser mayor a la fecha de fin.';
    }
    if (control.errors?.cantidadVehiculoInvalido) {
      return 'El campo debe ser un número positivo con hasta 3 decimales opcionales.';
    }
    // error min y max
    if (control.errors?.min) {
      const minError = control.errors.min;
      return `El valor mínimo permitido es ${minError.min}.`;
    }
    if (control.errors?.max) {
      const maxError = control.errors.max;
      return `El valor máximo permitido es ${maxError.max}.`;
    }
    if (control.errors?.noIgualPassword) {
      return 'Los campos de contraseña no coinciden.';
    }
    if (control.errors?.email) {
      return 'Correo electrónico inválido.';
    }
    if (control.errors?.dateRangeExceeds) {
      const maxMonths = control.errors.dateRangeExceeds.maxMonths;
      return `El rango de fechas no puede exceder los ${maxMonths} Meses.`;
    }

    // Agrega aquí más validaciones específicas según tus necesidades

    return null;
  }

}
