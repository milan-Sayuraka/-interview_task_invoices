const mongoose = require('mongoose');

const InvoiceSchema = mongoose.Schema({
    created: {
        type: Date,
        default: Date.now,
      },
    invoiceNo: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: String,
        enum: ['Paid', 'Unpaid']
      },
    amount : { type: Number, min: 0, max: 17 }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);