import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingManagementComponent } from './building-management.component';
import { AddEditBulidingComponent } from './components/add-edit-buliding/add-edit-buliding.component';
import { MapViewComponent } from './components/map-view/map-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'map-view/1', pathMatch: 'full' },
  {
    path: '',
    component: BuildingManagementComponent,
    children: [
      { path: 'add-edit', component: AddEditBulidingComponent },
      { path: 'map-view/:id', component: MapViewComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuildingManagementRoutingModule {}
