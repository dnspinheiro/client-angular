import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from '../model/cliente/cliente';

@Component({
  selector: 'app-data-form',
  // templateUrl: './data-form.component.html',
  // styleUrls: ['./data-form.component.css']
})
export abstract class DataFormComponent implements OnInit {
  formulario: FormGroup;

  constructor(protected formBuilder: FormBuilder) { }

  ngOnInit() {
    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null),
    // });
    // this.formulario = this.formBuilder.group({
    //   descricao: [null, Validators.required],
    //   contato: this.formBuilder.group({
    //   email: [null, [Validators.required, Validators.email]],
    //   telefone: [null, [Validators.required, Validators.pattern('^[0-9]{1,2}\\s[0-9]{4,5}[-][0-9]{4,5}')]],
    //   cpf: [null, [Validators.required, Validators.pattern('^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}')]],
    //   })
    // });

    // para popular campos partindo do ts para html, usa o patchValue (this.formulario.patchValue).
    // Por exemplo, no carregamento dos dados de endereço por cep, usando (blur)
  }

  abstract submit();
  abstract list();
  abstract delete(id);

  onSubmit() {
    console.log(this.formulario);
    if (this.formulario.valid) {
      this.submit();
    } else {
      console.log('form invalido');
      Object.keys(this.formulario.controls).forEach(campo => {
        console.log(campo);
        const controle = this.formulario.get(campo);
        controle.markAsTouched();
      });
    }
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
}
