import {
    GET_INVOICES,
} from "./actions";
import axios from "axios";

export const GetInvoices = () => {

    return dispatch => {
        axios.get(`http://127.0.0.1:5000/invoices`)
            .then(res => {
                const invoices = res.data;
                dispatch({
                    type: GET_INVOICES,
                    invoices: invoices
                });
            })
    };
};


export const UpdateInvoices = (id, params) => {
    return dispatch => {
        axios.put(`http://127.0.0.1:5000/invoices/${id}`, params)
            .then(response => {
                axios.get(`http://127.0.0.1:5000/invoices`)
                    .then(res => {
                        const invoices = res.data;
                        dispatch({
                            type: GET_INVOICES,
                            users: invoices
                        });
                    })
            })
    };
};

export const AddUser = (params) => {
    return dispatch => {
        axios.post(`http://127.0.0.1:5000/invoices`, params)
            .then(response => {
                axios.get(`http://127.0.0.1:5000/invoices`)
                    .then(res => {
                        const invoices = res.data;
                        dispatch({
                            type: GET_INVOICES,
                            users: invoices
                        });
                    })
            })
    };
};

export const DeleteInvoices = (id) => {
    return dispatch => {
        axios.delete(`http://127.0.0.1:5000/invoices/${id}`)
            .then(response => {
                axios.get(`http://127.0.0.1:5000/invoices`)
                    .then(res => {
                        const invoices = res.data;
                        dispatch({
                            type: GET_INVOICES,
                            users: invoices
                        });
                    })
            })
    };
};