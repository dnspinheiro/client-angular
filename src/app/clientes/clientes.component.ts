import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataFormComponent } from '../shared/data-form.component';
// import { Cliente } from '../model/cliente/cliente';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent extends DataFormComponent implements OnInit {

  constructor(protected formBuilder: FormBuilder, protected http: HttpClient) {
    super(formBuilder, http, 'clientes');
    this.list();
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: [null],
      descricao: [null, Validators.required],
      // contato: this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      telefone: [null, [Validators.required, Validators.pattern('^[0-9]{1,2}\\s[0-9]{4,5}[-][0-9]{4,5}')]],
      cpf: [null, [Validators.required, Validators.pattern('^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}')]],
      data: [null, [Validators.required, Validators.pattern('((\\d{2})|(\\d))\/((\\d{2})|(\\d))\/((\\d{4})|(\\d{2}))')]],
      // data: [null, [Validators.required, Validators.pattern('^\\d{1,2}\/\\d{1,2}\/\\d{4}$')]],
      // })
    });
  }
}
