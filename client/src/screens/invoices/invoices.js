import React, { useState } from 'react';
import { connect } from "react-redux";
import { Card } from 'primereact/card';
import InvoiceDataTable from "../../components/dataTable/dataTable"
import PieChart from "../../components/pieChart/pieChart"
import {
    GetInvoices
  } from "../../store/actions/invoiceAction";

  class Invoices extends React.Component   {



    componentDidMount() {
        // making all API calls and store in the redux-store
        this.props.GetInvoices();
      }

  render() {
    return (
        <div>
            <div className="card">
                <div className="grid p-fluid">
                    <div className="field col-12 md:col">
                        <Card title="Simple Card" >
                            <InvoiceDataTable />
                        </Card>
                    </div>
                </div>
            </div>

        </div>
    );
}
}

const mapStateToProps = state => ({
    Invoices: state.invoice.Invoices
  });

const mapDispacthToProps = dispatch => {
    return {
        GetInvoices: () => dispatch(GetInvoices())    
    };
  
  };

  export default connect(
    mapStateToProps,
    mapDispacthToProps
  )(Invoices);

// export default Invoices;