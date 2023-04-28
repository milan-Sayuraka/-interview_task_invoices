import { combineReducers } from 'redux';
import InvoiceReducer from './invoiceReducer'; //add this line

const rootReducer = combineReducers({
    invoice:InvoiceReducer  
  });
export default rootReducer;