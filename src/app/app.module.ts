import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ClientesComponent } from '@src/app/clientes/clientes.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from '@src/app/shared/router-reuse.class';
import { EmpresasComponent } from '@src/app/empresas/empresas.component';
import { DataFormComponent } from '@src/app/shared/data-form.component';
// import { Service } from './service/api.service';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    EmpresasComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    FormBuilder,
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
