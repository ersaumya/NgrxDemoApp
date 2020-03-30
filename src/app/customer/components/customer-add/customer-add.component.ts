import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store, State, select } from "@ngrx/store";
import * as customerActions from "../../store/actions/customer.action";
import * as fromCustomer from "../../store/reducers/customer.reducer";
import { Customer } from "../../models/customer.model";

@Component({
  selector: "app-customer-add",
  templateUrl: "./customer-add.component.html",
  styleUrls: ["./customer-add.component.css"]
})
export class CustomerAddComponent implements OnInit {
  customerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromCustomer.AppState>
  ) {}

  ngOnInit(): void {
    //initialize the form with default values
    this.customerForm = this.fb.group({
      name: ["", Validators.required], // Set initial value to empty string
      phone: ["", Validators.required],
      address: ["", Validators.required],
      membership: ["", Validators.required]
    });
  }

   createCustomer() {
    const newCustomer: Customer = {
      name: this.customerForm.get("name").value,
      phone: this.customerForm.get("phone").value,
      address: this.customerForm.get("address").value,
      membership: this.customerForm.get("membership").value
    };
    this.store.dispatch(new customerActions.CreateCustomer(newCustomer));
    this.customerForm.reset();
  }

  
}
