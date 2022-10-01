import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildingManagementRoutingModule } from './building-management-routing.module';
import { BuildingManagementComponent } from './building-management.component';
import { HttpClientModule } from '@angular/common/http';
import { AddEditBulidingComponent } from './components/add-edit-buliding/add-edit-buliding.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from '../shared/components/loader/loader.module';
import { MapViewComponent } from './components/map-view/map-view.component';

@NgModule({
  declarations: [
    BuildingManagementComponent,
    AddEditBulidingComponent,
    MapViewComponent,
  ],
  imports: [
    CommonModule,
    BuildingManagementRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoaderModule,
  ],
})
export class BuildingManagementModule {}
