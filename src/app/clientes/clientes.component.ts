import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../model/cliente/cliente.service';
import { DataFormComponent } from '../shared/data-form.component';
import { Cliente } from '../model/cliente/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent extends DataFormComponent implements OnInit {

  clientes: Cliente[];

  constructor(protected formBuilder: FormBuilder, protected clienteService: ClienteService) {
    super(formBuilder);
    this.list();
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      descricao: [null, Validators.required],
      // contato: this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      telefone: [null, [Validators.required, Validators.pattern('^[0-9]{1,2}\\s[0-9]{4,5}[-][0-9]{4,5}')]],
      cpf: [null, [Validators.required, Validators.pattern('^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}')]],
      // })
    });
  }

  list() {
    this.clienteService.list().subscribe(data => {
      console.log('data list', data);
      this.clientes = data;
    });
    // throw new Error("Method not implemented.");
  }

  atualizar(item) {
    console.log('item', item);

    this.formulario.patchValue({
      id: item.id,
      descricao: item.descricao,
      cpf: item.cpf,
      telefone: item.telefone,
      email: item.email,
    });
  }

  delete(id) {
    this.clienteService.remove(id).subscribe(data => {
      console.log('deleted');
    });
    // throw new Error("Method not implemented.");
  }

  submit() {
    console.log('form', this.formulario.value);

    this.clienteService.save(
      this.formulario.value).subscribe(dados => {
        console.log('dados', dados);
        // this.cancelar();
      }, (error) => alert('error'));
  }

}
