import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CrudService } from '../../shared/service/crud-service';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends CrudService<Cliente>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.api}clientes`);
  }
}
