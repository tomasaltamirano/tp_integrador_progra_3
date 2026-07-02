/*========================
    Modelos de productos
========================*/

import connection from '../database/db.js';

const selectAllProductos = () => {
	const sql = 'SELECT * FROM productos WHERE activo = 1';
	return connection.query(sql);
};

const selectProductoById = id => {
	const sql = 'SELECT * FROM productos WHERE id = ?';
	return connection.query(sql, [id]);
};

const insertProducto = (nombre, precio, descripcion, imagen, categoria) => {
	const sql =
		'INSERT INTO productos (nombre, precio, descripcion, imagen, categoria, activo) VALUES (?, ?, ?, ?, ?, 1)';
	return connection.query(sql, [
		nombre,
		precio,
		descripcion,
		imagen,
		categoria,
	]);
};

const updateProducto = (nombre, precio, descripcion, imagen, categoria, id) => {
	const sql =
		'UPDATE productos SET nombre = ?, precio = ?, descripcion = ?, imagen = ?, categoria = ? WHERE id = ?';
	return connection.query(sql, [
		nombre,
		precio,
		descripcion,
		imagen,
		categoria,
		id,
	]);
};

const desactivarProducto = id => {
	const sql = 'UPDATE productos SET activo = 0 WHERE id = ?';
	return connection.query(sql, [id]);
};

const activarProducto = id => {
	const sql = 'UPDATE productos SET activo = 1 WHERE id = ?';
	return connection.query(sql, [id]);
};

export default {
	selectAllProductos,
	selectProductoById,
	insertProducto,
	updateProducto,
	desactivarProducto,
	activarProducto,
};
