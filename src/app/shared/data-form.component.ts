import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from './service/crud-service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-data-form',
  template: '<div></div>',
  // styleUrls: ['./data-form.component.css']
})
export abstract class DataFormComponent extends CrudService {
  formulario: FormGroup;
  resources: any;

  constructor(protected formBuilder: FormBuilder, protected http: HttpClient, protected ENDPOINT: String) {
    super(formBuilder, http, `${environment.api}clientes`);
  }

  submit() {
    // this.getCampo('data').setValue(this.getCampo('data').value.replace(/\//g, ""));
    this.save(
      this.formulario.value).subscribe(dados => {
        this.cancelar();
        this.list();
      }, (error) => alert('error'));
  }

  list() {
    this.listAll().subscribe(data => {
      this.resources = data;
    });
    // throw new Error("Method not implemented.");
  }

  delete(id) {
    this.remove(id).subscribe(data => {
      console.log('deleted');
      this.list();
    });
    // throw new Error("Method not implemented.");
  }

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
