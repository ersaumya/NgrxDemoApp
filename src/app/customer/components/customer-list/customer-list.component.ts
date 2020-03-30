import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { Customer } from "../../models/customer.model";
// import customer
import * as customerActions from "../../store/actions/customer.action";

import * as fromCustomer from "../../store/reducers/customer.reducer";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.css"]
})
export class CustomerListComponent implements OnInit {
  
  customers$: Observable<Customer[]>;
  error$: Observable<String>;

  constructor(private store: Store<fromCustomer.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new customerActions.LoadCustomers());
    this.customers$ = this.store.pipe(select(fromCustomer.getCustomers));
  }

  deleteCustomer(customer: Customer) {
    if (confirm("Are You Sure You want to Delete the User?")) {
      this.store.dispatch(new customerActions.DeleteCustomer(customer.id));
    }
  }

  editCustomer(customer: Customer) {
    this.store.dispatch(new customerActions.LoadCustomer(customer.id));
  }
}
