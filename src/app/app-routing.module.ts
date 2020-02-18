import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
// import { EmpresasComponent } from './empresas/empresas.component';

import { routes } from '@src/app/app.routes';


// const routes: Routes = [
//   { path: 'clientes', component: ClientesComponent },
//   { path: 'empresas', component: EmpresasComponent },
//   // { path: 'clientes', loadChildren: () => import('./clientes/clientes.component').then(m => m.ClientesComponent) },
//   { path: '', pathMatch: 'full', redirectTo: 'clientes' },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
