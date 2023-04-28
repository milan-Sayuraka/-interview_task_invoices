export const ProductService = {
    getProductsData() {
        return [
            {
                _id: '644a5747d5e9f25fcb68e61a',
                __v: 0,
                status: 'Paid',
                invoiceNo: 'JDHGD32354',
                description: 'sample value',
                created: '2023-04-27T11:06:47.670Z',
                amount: 5,
            }
        ];
    },

    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 5));
    },

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    },

    getProducts() {
        return Promise.resolve(this.getProductsData());
    },

    getProductsWithOrdersSmall() {
        return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
    },

    getProductsWithOrders() {
        return Promise.resolve(this.getProductsWithOrdersData());
    }
};

