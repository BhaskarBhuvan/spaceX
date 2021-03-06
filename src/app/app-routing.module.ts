import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissionsComponent } from './missions/missions.component';

const routes: Routes = [
  {path: '', redirectTo:'missions', pathMatch:'full'},
  {path: 'missions', component: MissionsComponent},
  {path: '**', redirectTo: 'missions'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
