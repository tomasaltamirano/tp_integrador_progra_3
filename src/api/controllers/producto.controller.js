/*========================
    Controlador de Productos
========================*/
import connection from '../database/db.js';

// GET todos los productos activos
export const obtenerProductos = async (req, res) => {
	try {
		const [rows] = await connection.query(
			'SELECT * FROM productos WHERE activo = 1',
		);
		res.status(200).json({ payload: rows });
	} catch (error) {
		console.error('Error obteniendo productos: ', error.message);
		res.status(500).json({ error: 'Error interno del servidor' });
	}
};

// GET un producto por ID
export const obtenerProductoPorId = async (req, res) => {
	try {
		const id = req.id; // Lo pusimos en req.id desde el middleware validateId
		const [rows] = await connection.query(
			'SELECT * FROM productos WHERE id = ?',
			[id],
		);
		if (rows.length === 0) {
			return res.status(404).json({ error: 'Producto no encontrado' });
		}
		res.status(200).json({ payload: rows[0] });
	} catch (error) {
		console.error('Error obteniendo producto: ', error.message);
		res.status(500).json({ error: 'Error interno del servidor' });
	}
};

// POST crear producto
export const crearProducto = async (req, res) => {
	try {
		const { nombre, precio, descripcion, imagen, categoria } = req.body;
		const [result] = await connection.query(
			'INSERT INTO productos (nombre, precio, descripcion, imagen, categoria, activo) VALUES (?, ?, ?, ?, ?, 1)',
			[nombre, precio, descripcion, imagen, categoria],
		);
		res.status(201).json({ mensaje: 'Producto creado', id: result.insertId });
	} catch (error) {
		console.error('Error creando producto: ', error.message);
		res.status(500).json({ error: 'Error interno del servidor' });
	}
};

// PUT editar producto
export const editarProducto = async (req, res) => {
	try {
		const id = req.id;
		const { nombre, precio, descripcion, imagen, categoria } = req.body;
		await connection.query(
			'UPDATE productos SET nombre = ?, precio = ?, descripcion = ?, imagen = ?, categoria = ? WHERE id = ?',
			[nombre, precio, descripcion, imagen, categoria, id],
		);
		res.status(200).json({ mensaje: 'Producto actualizado' });
	} catch (error) {
		console.error('Error actualizando producto: ', error.message);
		res.status(500).json({ error: 'Error interno del servidor' });
	}
};

// PUT desactivar producto
export const desactivarProducto = async (req, res) => {
	try {
		const id = req.id;
		await connection.query('UPDATE productos SET activo = 0 WHERE id = ?', [
			id,
		]);
		res.status(200).json({ mensaje: 'Producto desactivado' });
	} catch (error) {
		console.error('Error desactivando producto: ', error.message);
		res.status(500).json({ error: 'Error interno del servidor' });
	}
};

// PUT activar producto
export const activarProducto = async (req, res) => {
	try {
		const id = req.id;
		await connection.query('UPDATE productos SET activo = 1 WHERE id = ?', [
			id,
		]);
		res.status(200).json({ mensaje: 'Producto activado' });
	} catch (error) {
		console.error('Error activando producto: ', error.message);
		res.status(500).json({ error: 'Error interno del servidor' });
	}
};
