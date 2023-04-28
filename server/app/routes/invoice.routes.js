module.exports = (app) => {
    const invoices = require('../controllers/invoice.controller.js');

    // Create a new Invoice
    app.post('/invoices', invoices.create);

    // Retrieve all Invoices
    app.get('/invoices', invoices.findAll);

    // Retrieve a single Invoice with invoiceId
    app.get('/invoices/:invoiceId', invoices.findOne);

    // Update a Invoice with invoiceId
    app.put('/invoices/:invoiceId', invoices.update);

    // Delete a Invoice with invoiceId
    app.delete('/invoices/:invoiceId', invoices.delete);
}