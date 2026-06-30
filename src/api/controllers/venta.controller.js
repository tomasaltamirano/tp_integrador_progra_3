/*========================
    Controlador de Ventas
========================*/
import VentaModels from '../models/venta.models.js';

// GET todas las ventas con sus productos
export const obtenerVentas = async (req, res) => {
	try {
		const [ventas] = await VentaModels.selectAllVentas();

		for (const venta of ventas) {
			const [productos] = await VentaModels.selectProductosPorVenta(venta.id);
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

		const [result] = await VentaModels.insertVenta(nombre_cliente, precio_total);
		const ventaId = result.insertId;

		for (const producto of productos) {
			await VentaModels.insertVentaProducto(ventaId, producto.id, producto.cantidad);
		}

		res.status(201).json({ mensaje: 'Venta registrada', id: ventaId });
	} catch (error) {
		console.error('Error registrando venta: ', error.message);
		res.status(500).json({ error: 'Error interno del servidor' });
	}
};