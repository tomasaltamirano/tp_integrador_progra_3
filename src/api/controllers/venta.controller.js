/*========================
    Controlador de Ventas
========================*/
import connection from '../database/db.js';

// GET todas las ventas con sus productos
export const obtenerVentas = async (req, res) => {
	try {
		const [ventas] = await connection.query('SELECT * FROM ventas');

		for (const venta of ventas) {
			const [productos] = await connection.query(
				`SELECT p.*, vp.cantidad 
                 FROM productos p 
                 JOIN venta_productos vp ON p.id = vp.producto_id 
                 WHERE vp.venta_id = ?`,
				[venta.id],
			);
			venta.productos = productos;
		}

		res.status(200).json({ payload: ventas });
	} catch (error) {
		console.error('Error obteniendo ventas: ', error.message);
		res.status(500).json({ error: 'Error interno del servidor' });
	}
};

// POST registrar venta
export const registrarVenta = async (req, res) => {
	try {
		const { nombre_cliente, precio_total, productos } = req.body;

		const [result] = await connection.query(
			'INSERT INTO ventas (nombre_cliente, precio_total) VALUES (?, ?)',
			[nombre_cliente, precio_total],
		);

		const ventaId = result.insertId;

		for (const producto of productos) {
			await connection.query(
				'INSERT INTO venta_productos (venta_id, producto_id, cantidad) VALUES (?, ?, ?)',
				[ventaId, producto.id, producto.cantidad],
			);
		}

		res.status(201).json({ mensaje: 'Venta registrada', id: ventaId });
	} catch (error) {
		console.error('Error registrando venta: ', error.message);
		res.status(500).json({ error: 'Error interno del servidor' });
	}
};
