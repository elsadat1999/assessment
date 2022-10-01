import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'building-management', pathMatch: 'full' },
  {
    path: 'building-management',
    loadChildren: () =>
      import('./building-management/building-management.module').then(
        (m) => m.BuildingManagementModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
