import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from "@ngrx/effects";
import { CustomerService } from "../../services/customer.service";
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from "rxjs/operators";
import { Action } from '@ngrx/store';
import { Customer } from '../../models/customer.model';
import * as customerActions from "../../store/actions/customer.action";

@Injectable({ providedIn: "root" })
export class CustomerEffect {
  constructor(
    private actions$: Actions,
    private customerService: CustomerService
  ) {}

  @Effect()
  loadCustomers$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.LoadCustomers>(
      customerActions.CustomerActionTypes.LOAD_CUSTOMERS
    ),
    mergeMap((action: customerActions.LoadCustomers) =>
      this.customerService.getCustomers().pipe(
        map(
          (customers: Customer[]) =>
            new customerActions.LoadCustomersSuccess(customers)
        ),
        catchError(err => of(new customerActions.LoadCustomersFail(err)))
      )
    )
  );
}
