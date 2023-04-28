const Invoice = require('../models/invoice.model.js');

// Create and Save a new Invoice
exports.create = (req, res) => {
    // Validate request
    if(!req.body.invoiceNo) {
        return res.status(400).send({
            message: "invoice No can not be empty"
        });
    }

    // Create a Invoice
    const invoice = new Invoice({
        invoiceNo: req.body.invoiceNo , 
        description: req.body.description || "Untitled",
        status: req.body.status,
        amount: req.body.amount,
    });

    // Save Invoice in the database
    invoice.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Invoice."
        });
    });
};

// Retrieve and return all invoices from the database.
exports.findAll = (req, res) => {
    Invoice.find()
    .then(invoices => {
        res.send(invoices);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving invoices."
        });
    });
};

// Find a single invoice with a invoiceId
exports.findOne = (req, res) => {

};

// Update a invoice identified by the invoiceId in the request
exports.update = (req, res) => {

    // Find invoice and update it with the request body
    Invoice.findByIdAndUpdate(req.params.invoiceId, {
        invoiceNo: req.body.invoiceNo , 
        description: req.body.description || "Untitled",
        status: req.body.status,
        amount: req.body.amount,
    }, {new: true})
    .then(invoice => {
        if(!invoice) {
            return res.status(404).send({
                message: "Invoice not found with id " + req.params.invoiceId
            });
        }
        res.send(invoice);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Invoice not found with id " + req.params.invoiceId
            });                
        }
        return res.status(500).send({
            message: "Error updating invoice with id " + req.params.invoiceId
        });
    });
};

// Delete a invoice with the specified invoiceId in the request
exports.delete = (req, res) => {
    Invoice.findByIdAndRemove(req.params.invoiceId)
    .then(invoice => {
        if(!invoice) {
            return res.status(404).send({
                message: "Invoice not found with id " + req.params.invoiceId
            });
        }
        res.send({message: "Invoice deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Invoice not found with id " + req.params.invoiceId
            });                
        }
        return res.status(500).send({
            message: "Could not delete invoice with id " + req.params.invoiceId
        });
    });
};