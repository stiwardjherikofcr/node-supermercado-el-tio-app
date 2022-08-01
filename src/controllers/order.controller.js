const pool = require('../database/db');
const orderController = {};

orderController.getOrders = async (req, res) => {
    const id_customer = req.user.id_customer;
    await pool.query('SELECT * FROM `order` WHERE id_customer = ?', [id_customer], (err, rows) => {
        if (err) {
            res.json(err);
        } else {
            orders = rows.map(order => {
                return {
                    id: order.id_order,
                    date: order.date.toLocaleDateString(),
                    time: order.date,
                    subtotal: order.subtotal,
                    iva: order.iva,
                    total: order.total,
                }
            })
            res.render('orders/orders', { data: orders })
        }
    })
}

orderController.getOrder = async (req, res) => {
    const id_order = req.params.id;
    await pool.query('SELECT * FROM `order_producto` WHERE id_order = ?', [id_order], (err, rows) => {
        if (err) {
            res.json(err);
        } else {
            orders = rows.map(order => {
                return {
                    id: order.id_order_product,
                    id_product: order.id_product,
                    name: '',
                    image: '',
                    quantity: order.quantity,
                    price: order.price,
                    subtotal: order.subtotal,
                    iva: order.iva,
                    total: order.total,
                }
            })
            orders.forEach(order => {
                pool.query('SELECT * FROM `producto` WHERE id_product = ?', [order.id_product], (err, rows) => {
                    if (err) {
                        res.json(err);
                    } else {
                        order.name = rows[0].name;
                        order.image = Buffer.from(rows[0].image).toString('base64');
                    }
                })
            })
            res.render('orders/details', { data: orders })
        }
    })
}


orderController.createOrder = async (req, res) => {
}


orderController.getOrdersAdmin = (req, res) => {
    console.log('getOrdersAdmin');
    /*await pool.query('SELECT * FROM `order`', (err, rows) => {
        if (err) {
            res.json(err);
        } else {
            orders = rows.map(order => {
                return {
                    id: order.id_order,
                    date: order.date.toLocaleDateString(),
                    time: order.date,
                    subtotal: order.subtotal,
                    iva: order.iva,
                    total: order.total,
                }
            })
            res.render('orders/orders', { data: orders })
            console.log(rows);
            res.json(rows)
        }
    })*/
}


orderController.getOrderAdmin = async (req, res) => {
}


orderController.updateOrderAdmin = async (req, res) => {
}


orderController.deleteOrderAdmin = async (req, res) => {
}

module.exports = orderController;