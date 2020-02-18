import { Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';

export const routes: Routes = [
    { path: 'clientes', component: ClientesComponent },
    // { path: 'clientes', loadChildren: () => import('./clientes/clientes.component').then(m => m.ClientesComponent) },
    { path: '', pathMatch: 'full', redirectTo: 'clientes' },
];