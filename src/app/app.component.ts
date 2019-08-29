import { Component } from '@angular/core';
import { ClienteService } from './model/cliente/cliente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'base-project';
  lista: any;

  constructor(private clienteService: ClienteService) {
    this.get();
  }

  get() {
    this.clienteService.list().subscribe(data => {
      this.lista = data.data;
    });
  }
}
