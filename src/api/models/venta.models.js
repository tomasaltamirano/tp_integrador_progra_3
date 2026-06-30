import connection from '../database/db.js';

const selectAllVentas = () => {
    const sql = 'SELECT * FROM ventas';
    return connection.query(sql);
};

const selectProductosPorVenta = (ventaId) => {
    const sql = `SELECT p.*, vp.cantidad 
                FROM productos p 
                JOIN venta_productos vp ON p.id = vp.producto_id 
                WHERE vp.venta_id = ?`;
    return connection.query(sql, [ventaId]);
};

const insertVenta = (nombre_cliente, precio_total) => {
    const sql = 'INSERT INTO ventas (nombre_cliente, precio_total) VALUES (?, ?)';
    return connection.query(sql, [nombre_cliente, precio_total]);
};

const insertVentaProducto = (ventaId, productoId, cantidad) => {
    const sql = 'INSERT INTO venta_productos (venta_id, producto_id, cantidad) VALUES (?, ?, ?)';
    return connection.query(sql, [ventaId, productoId, cantidad]);
};

export default {
    selectAllVentas,
    selectProductosPorVenta,
    insertVenta,
    insertVentaProducto,
};