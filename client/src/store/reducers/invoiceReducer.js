import { 
    GET_INVOICES,
  } from "../actions/actions";

  const INITIAL_STATE = {
    Invoices: [],
    loading : false,
  };

  export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
      case GET_INVOICES: {
        return {
          ...state,
          Invoices: action.invoices,
          loading: false
        };
      }
      default:
        return state;
    }
  };