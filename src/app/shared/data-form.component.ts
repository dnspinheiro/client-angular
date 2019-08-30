import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  template: '<div></div>',
  // styleUrls: ['./data-form.component.css']
})
export abstract class DataFormComponent {
  formulario: FormGroup;

  constructor(protected formBuilder: FormBuilder) {
  }

  abstract submit();
  abstract list();
  abstract delete(id);

  onSubmit() {
    // console.log(this.formulario);
    if (this.formulario.valid) {
      this.submit();
    } else {
      this.validForm();
    }
  }

  validForm() {
    console.log('form invalido', this.formulario);
    Object.keys(this.formulario.controls).forEach(campo => {
      const controle = this.formulario.get(campo);
      controle.markAsTouched();
    });
  }

  carregarDadosForm(item) {
    this.cancelar();
    this.formulario.patchValue(item);
  }

  cancelar() {
    this.formulario.reset();
  }

  verificaEmailInvalido() {
    const campoEmail = this.formulario.get('email');
    if (campoEmail.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  verificaValidTouched(campo) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
    };
  }

  getCampo(campo: string) {
    return this.formulario.get(campo);
  }
}
