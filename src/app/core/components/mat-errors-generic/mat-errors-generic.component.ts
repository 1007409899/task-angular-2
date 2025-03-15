import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { CustomValidatorsService } from '@app/core/services/custom-validators.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatFormFieldModule],
  selector: 'app-mat-errors-generic',
  templateUrl: './mat-errors-generic.component.html',
  styleUrls: ['./mat-errors-generic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: MatFormFieldControl, useExisting: MatErrorsGenericComponent }],
})
export class MatErrorsGenericComponent implements OnInit, OnChanges {
  @Input() formControlValid!: FormGroup;
  @Input() field!: string;
  @Input() nameError?: string;
  @Input() matHint?: number;
  @Input() ValorTouched? = false;

  valor: any;
  isFieldValid = false;
  fieldError!: string | null;
  lengthField!: number | null;
  constructor(private customValidatorsService: CustomValidatorsService) {}
  ngOnInit(): void {
    this.formControlValid?.get(this.field)!.valueChanges.subscribe((value: any) => {
      if (value) {
        this.updateValidity();
      }
    });
    this.formControlValid?.valueChanges.subscribe((value: any) => {
      if (value) {
        this.updateValidity();
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ValorTouched'] && changes['ValorTouched'].currentValue === true) {
      this.updateValidity();
    }
    if (changes['formControlValid']) {
      this.updateValidity();
    }
  }

  getFieldError(): string | null {
    return this.customValidatorsService.getFieldError(this.formControlValid, this.field);
  }

  lengthFieldForm(): number {
    return this.formControlValid.get(this.field)?.value?.length;
  }

  isValidField(form: FormGroup, field: string, nameError = ''): boolean {
    if (nameError !== '') {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      if (form.controls[field].errors?.[nameError] && form.controls[field].touched) {
        this.isFieldValid = true;
        return true;
      }
      this.isFieldValid = false;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    if (form.controls[field].errors && form.controls[field].touched) {
      this.isFieldValid = true;
      return true;
    }
    this.isFieldValid = false;
    return false;
  }
  private updateValidity(): void {
    this.fieldError = this.getFieldError();
    this.lengthField = this.lengthFieldForm();
    this.isFieldValid = this.isValidField(this.formControlValid, this.field, this.nameError);
  }
}
