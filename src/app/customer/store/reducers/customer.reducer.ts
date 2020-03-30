import * as customerAction from "../actions/customer.action";
import { Customer } from "../../models/customer.model";
import * as fromRoot from "../../../state/app-state";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface CustomerState {
  customers: Customer[];
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  customers: CustomerState;
}

export const initialState: CustomerState = {
  customers: [],
  loading: false,
  loaded: false,
  error: ""
};

export function customerReducer(
  state = initialState,
  action: customerAction.CustomerAction
): CustomerState {
  switch (action.type) {
    case customerAction.CustomerActionTypes.LOAD_CUSTOMERS: {
      return {
        ...state,
        loading: true
      };
    }
    case customerAction.CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        customers: action.payload
      };
    }
    case customerAction.CustomerActionTypes.LOAD_CUSTOMERS_FAIL: {
      return {
        ...state,
        customers:[],
        loading: false,
        loaded: false,
        error:action.payload
      };
    }

    default: {
      return state;
    }
  }
}

//selector
const getCustomerFeatureState = createFeatureSelector<CustomerState>(
  "customers"
);
export const getCustomers = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.customers
);

export const getCustomersLoading = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.loading
);

export const getCustomersLoaded = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.loaded
);

export const getError = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.error
);
