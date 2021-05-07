import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { ClienteComponent} from './cliente/cliente.component';
import { CdsComponent} from './cds/cds.component';
const routes: Routes = [ 
  {path: '', redirectTo: 'home', pathMatch: 'full' }, 
  {path:'home', component: HomeComponent},
  {path:'Cliente', component: ClienteComponent},
  {path:'Cds', component: CdsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
