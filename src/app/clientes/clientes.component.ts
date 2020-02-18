import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataFormComponent } from '../shared/data-form.component';
// import { Cliente } from '../model/cliente/cliente';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../shared/service/crud-service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent extends DataFormComponent implements OnInit {
  // protected dataForm = 
  service: any;
  constructor(protected formBuilder: FormBuilder,
    protected http: HttpClient,
    protected injector: Injector) {
    super(injector, 'cliente');
    this.service = new CrudService(injector, 'cliente');
    this.list();
  }

  ngOnInit() {
    this.listAll().subscribe(data => {
      console.log('rsc', data);
    });
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      // contato: this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      telefone: [null, [Validators.required, Validators.pattern('^[0-9]{1,2}\\s[0-9]{4,5}[-][0-9]{4,5}')]],
      cpf: [null, [Validators.required, Validators.pattern('^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}')]],
      data: [null, [Validators.required, Validators.pattern('((\\d{2})|(\\d))\/((\\d{2})|(\\d))\/((\\d{4})|(\\d{2}))')]],
      // data: [null, [Validators.required, Validators.pattern('^\\d{1,2}\/\\d{1,2}\/\\d{4}$')]],
      // files: [null]
      // })
    });
  }
}
