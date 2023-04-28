import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import Moment from 'moment';

const DialogBox = (props) => {
    return (
        <Dialog visible={props.productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Invoice Details" modal className="p-fluid" footer={props.dialogFooter} onHide={props.hideDialog}>
            <div className="field">
                <label htmlFor="name" className="font-bold">
                    Invoice Number
                </label>
                <InputText id="name" value={props.dialogBoxData.invoiceNo} onChange={(e) => props.onInputChange(e, 'invoiceNo')} autoFocus />
                {props.submit && !props.dialogBoxData.invoiceNo && <small className="p-error">Invoice No is required.</small>}
            </div>
            <div className="field">
                <label htmlFor="description" className="font-bold">
                    Description
                </label>
                <InputTextarea id="description" value={props.dialogBoxData.description} onChange={(e) => props.onInputChange(e, 'description')} required rows={3} cols={20} className={classNames({ 'p-invalid': props.submit && !props.dialogBoxData.description })} />
                {props.submit && !props.dialogBoxData.description && <small className="p-error">Description is required.</small>}
            </div>

            <div className="field">
                <label className="mb-3 font-bold">Status</label>
                <div className="formgrid grid">
                    <div className="field-radiobutton col-6">
                        <RadioButton inputId="category1" name="category" value="Paid" onChange={props.onStatusChange} checked={props.dialogBoxData.status === 'Paid'} />
                        <label htmlFor="category1">Paid</label>
                    </div>
                    <div className="field-radiobutton col-6">
                        <RadioButton inputId="category2" name="category" value="Unpaid" onChange={props.onStatusChange} checked={props.dialogBoxData.status === 'Unpaid'} />
                        <label htmlFor="category2">Unpaid</label>
                    </div>
                </div>
            </div>

            <div className="formgrid grid">
                <div className="field col">
                    <label htmlFor="price" className="font-bold">
                        Amount
                    </label>
                    <InputNumber id="price" value={props.dialogBoxData.amount} onValueChange={(e) => props.onInputNumberChange(e, 'amount')} />
                </div>
                {props.dialogBoxData.created ? <div className="field col">
                    <label htmlFor="quantity" className="font-bold">
                        Created Date
                    </label>
                    <InputText id="quantity" value={Moment(props.dialogBoxData.created).format('MMMM Do YYYY, h:mm:ss a')} disabled />
                </div> : null}
            </div>
        </Dialog>
    )
}

export default DialogBox;