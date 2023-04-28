import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './ProductService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { useDispatch, useSelector } from "react-redux"
import { UpdateInvoices, AddUser, DeleteInvoices } from '../../store/actions/invoiceAction';
import DialogBox from '../dialogBox/dialogbox'
import DeleteDialogBox from '../dialogBox/deleteDialogBox';
import Moment from 'moment';

export default function InvoiceDataTable() {
    let emptyinvoice = {
        _id: null,
        invoiceNo: '',
        description: '',
        status: '',
        amount: 0,
        created: ''
    };
    const getdata = useSelector((state) => state.invoice.Invoices)
    const dispatch = useDispatch()
    const [products, setProducts] = useState(getdata);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [product, setProduct] = useState(emptyinvoice);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        invoiceNo: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        description: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        status: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        amount: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    });
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {

    }, [getdata]);

    const statusBodyTemplate = (product) => {
        return <Tag value={product.status} severity={getSeverity(product)}></Tag>;
    };

    const getSeverity = (product) => {
        switch (product.status) {
            case 'Paid':
                return 'success';

            case 'Unpaid':
                return 'warning';

            default:
                return null;
        }
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (product.invoiceNo.trim()) {
            let _products = [...products];
            let _product = { ...product };
            if (product._id) {
                const index = findIndexById(product._id);
                dispatch(UpdateInvoices(product._id, _product))
                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Invoice Updated', life: 3000 });
            } else {
                dispatch(AddUser(_product))
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Invoice Created', life: 3000 });
            }
            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyinvoice);
        }
    };

    const deleteProduct = () => {
        let _products = products.filter((val) => val._id !== product._id);
        dispatch(DeleteInvoices(product._id))
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyinvoice);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });

    };

    const openNew = () => {
        setProduct(emptyinvoice);
        setSubmitted(false);
        setProductDialog(true);
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const onStatusChange = (e) => {
        let _product = { ...product };

        _product['status'] = e.value;
        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < products.length; i++) {
            if (products[i]._id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const dateBodyTemplate = (rowData) => {
        return formatdate(rowData.created);
    }

    const formatdate = (value) => {
        return Moment(value).format('ll');
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    const dialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );

    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
            </div>
        );
    };

    const header = renderHeader();

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} ></Toolbar>
                <DataTable value={products} paginator rows={5} dataKey="_id" header={header} filters={filters} filterDisplay="row" emptyMessage="No invoices found." onSelectionChange={(e) => setSelectedProducts(e.value)} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="invoiceNo" header="Invoice No" sortable style={{ width: '25%' }}></Column>
                    <Column field="description" header="Description" sortable style={{ width: '25%' }}></Column>
                    <Column header="Status" body={statusBodyTemplate} sortable style={{ width: '10%' }}></Column>
                    <Column field="amount" header="Amount" sortable style={{ width: '10%' }}></Column>
                    <Column body={dateBodyTemplate} field="created" header="Created Date" sortable style={{ width: '25%' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
                {productDialog ?
                    <DialogBox
                        dialogBoxData={product}
                        submit={submitted}
                        onStatusChange={onStatusChange}
                        onInputChange={onInputChange}
                        productDialog={productDialog}
                        dialogFooter={dialogFooter}
                        hideDialog={hideDialog}
                        product={product}
                        onInputNumberChange={onInputNumberChange} /> : null}

                {deleteProductDialog ?
                    <DeleteDialogBox
                        deleteDialogBoxData={product}
                        deleteProductDialog={deleteProductDialog}
                        deleteProductDialogFooter={deleteProductDialogFooter} /> : null}
            </div>
        </div>
    );
}
