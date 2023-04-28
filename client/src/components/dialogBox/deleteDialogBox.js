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

 const DeleteDialogBox = (props) => {
    return (
        <Dialog visible={props.deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={props.deleteProductDialogFooter} onHide={props.hideDeleteProductDialog}>
        <div className="confirmation-content">
            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
            {props.deleteDialogBoxData && (
                <span>
                    Are you sure you want to delete <b>{props.deleteDialogBoxData.invoiceNo}</b>?
                </span>
            )}
        </div>
    </Dialog>
    )
}

export default DeleteDialogBox;