import * as customerAction from "../actions/customer.action";
import { Customer } from "../../models/customer.model";
import * as fromRoot from "../../../state/app-state";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface CustomerState extends EntityState<Customer> {
  selectedCustomerId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  customers: CustomerState;
}

export const customerAdapter: EntityAdapter<Customer> = createEntityAdapter<
  Customer
>();

export const defaultCustomer: CustomerState = {
  ids: [],
  entities: {},
  selectedCustomerId: null,
  loading: false,
  loaded: false,
  error: ""
};

export const initialState = customerAdapter.getInitialState(defaultCustomer);

export function customerReducer(
  state = initialState,
  action: customerAction.CustomerAction
): CustomerState {
  switch (action.type) {
    // LOAD CUSTOMERS
    case customerAction.CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS: {
      return customerAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case customerAction.CustomerActionTypes.LOAD_CUSTOMERS_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    // LOAD CUSTOMER
    case customerAction.CustomerActionTypes.LOAD_CUSTOMER_SUCCESS: {
      return customerAdapter.addOne(action.payload, {
        ...state,
        selectedCustomerId: action.payload.id
      });
    }
    case customerAction.CustomerActionTypes.LOAD_CUSTOMER_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    // CREATE CUSTOMER
    case customerAction.CustomerActionTypes.CREATE_CUSTOMER_SUCCESS: {
      return customerAdapter.addOne(action.payload, state);
    }
    case customerAction.CustomerActionTypes.CREATE_CUSTOMER_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    // UPDATE CUSTOMER
    case customerAction.CustomerActionTypes.UPDATE_CUSTOMER_SUCCESS: {
      return customerAdapter.updateOne(action.payload, state);
    }
    case customerAction.CustomerActionTypes.UPDATE_CUSTOMER_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    // DELETE CUSTOMER
    case customerAction.CustomerActionTypes.DELETE_CUSTOMER_SUCCESS: {
      return customerAdapter.removeOne(action.payload, state);
    }
    case customerAction.CustomerActionTypes.DELETE_CUSTOMER_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
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
  customerAdapter.getSelectors().selectAll
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

export const getCurrentCustomerId = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.selectedCustomerId
);
export const getCurrentCustomer = createSelector(
  getCustomerFeatureState,
  getCurrentCustomerId,
  state => state.entities[state.selectedCustomerId]
);