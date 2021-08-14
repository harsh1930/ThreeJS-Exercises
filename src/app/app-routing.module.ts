import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalaxyComponent } from './galaxy/galaxy.component';
import { HauntedHouseComponent } from './haunted-house/haunted-house.component';
import { SolarsystemComponent } from './solarsystem/solarsystem.component';

const routes: Routes = [{
  path:'', component:SolarsystemComponent},
  {path:'hauntedhouse', component: HauntedHouseComponent},
  {path:'galaxy', component:GalaxyComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
