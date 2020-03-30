import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { customerReducer } from "./store/reducers/customer.reducer";
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerAddComponent } from './components/customer-add/customer-add.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerComponent } from './container/customer/customer.component';
import { EffectsModule } from '@ngrx/effects';
import { CustomerEffect } from './store/effects/customer.effect';


@NgModule({
  declarations: [
    CustomerAddComponent,
    CustomerEditComponent,
    CustomerListComponent,
    CustomerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CustomerRoutingModule,
    StoreModule.forFeature("customers", customerReducer),
    EffectsModule.forFeature([CustomerEffect])
  ]
})
export class CustomerModule {}
