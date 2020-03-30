import * as customerAction from "../actions/customer.action";
import { Customer } from "../../models/customer.model";
import * as fromRoot from "../../../state/app-state";

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
