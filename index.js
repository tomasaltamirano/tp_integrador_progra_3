import express from 'express';
import cors from 'cors';
import connection from './src/api/database/db.js'; // Importamos la conexion de nuestra BBDD
import environments from './src/api/config/environments.js'; // Traemos el puerto del .env

const PORT = environments.port;
const app = express();

app.get('/', (req, res) => {
	res.send('Hola mundo!');
});

// Creamos un endpoint minimo para verificar la conexion a la BBDD
// localhost:3000/products es nuestro endpoint, es decir la URL especifica de nuestra API Rest para obtener un recurso

//Middlewares globales
app.use(cors());
app.use(express.json());

//ahora quiero traer los activos de la base de datos, por lo tanto la consulta sql la modifico:
//'SELECT * FROM productos WHERE activo = 1'

//Endpoint para traer todos los productos activos:
app.get('/api/productos', async (req, res) => {
	// Nuestra app atenderá peticiones get a la url /products
	try {
		const [rows] = await connection.query(
			'SELECT * FROM productos WHERE activo = 1',
		); // Le pasamos la siguiente consulta SQL
		res.status(200).json({
			// La respuesta que nos proporciona el objeto res devolverá el JSON
			payload: rows,
		});
	} catch (error) {
		console.error('Error obteniendo productos: ', error.message);
	}
});

//Endpoint para traer un producto por ID:
app.get('/api/productos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { rows } = await connection.query(
			'SELECT FROM productos WHERE id = ?',
			[id],
		);
		if (rows.length === 0) {
			return res.status(404).json({ error: 'Producto no encontrado' });
		}
		res.status(200).json({ payload: rows[0] });
	} catch (error) {
		console.error('Error obteniendo producto', error.message);
		res.status(500).json({ error: 'Error interno del servidor' });
	}
});

//Endpoints restantes para despues probarlos en thunder client con la BASE DE DATOS REAL que vamos a usar.
/*
================= PRODUCTOS =================
- POST: para crear los productos
-PUT: para editar productos
-otro PUT para desactivar un producto
-otro PUT para activar un producto
================= VENTAS =================
POST: para registrar venta
GET: para ver todas las ventas con sus productos
*/

//Endpoint POST: para crear los productos:
app.post('/api/productos', async (req, res) => {
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
});

//Endpoint PUT: para editar productos:
app.put('/api/productos/:id', async (req, res) => {
	try {
		const { id } = req.params;
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
});

// Endpoint PUT: para desactivar producto (baja lógica)
app.put('/api/productos/:id/desactivar', async (req, res) => {
	try {
		const { id } = req.params;
		await connection.query('UPDATE productos SET activo = 0 WHERE id = ?', [
			id,
		]);
		res.status(200).json({ mensaje: 'Producto desactivado' });
	} catch (error) {
		console.error('Error desactivando producto: ', error.message);
		res.status(500).json({ error: 'Error interno del servidor' });
	}
});

// Endpoint PUT para activar producto
app.put('/api/productos/:id/activar', async (req, res) => {
	try {
		const { id } = req.params;
		await connection.query('UPDATE productos SET activo = 1 WHERE id = ?', [
			id,
		]);
		res.status(200).json({ mensaje: 'Producto activado' });
	} catch (error) {
		console.error('Error activando producto: ', error.message);
		res.status(500).json({ error: 'Error interno del servidor' });
	}
});

// ================= VENTAS =================

// Endpoint POST para registrar una venta
app.post('/api/ventas', async (req, res) => {
	try {
		const { nombre_cliente, precio_total, productos } = req.body;

		// Insertamos la venta
		const [result] = await connection.query(
			'INSERT INTO ventas (nombre_cliente, precio_total) VALUES (?, ?)',
			[nombre_cliente, precio_total],
		);

		const ventaId = result.insertId;

		// Insertamos cada producto de la venta en la tabla intermedia
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
});

// Endpoint GET: para consultar todas las ventas con sus productos
app.get('/api/ventas', async (req, res) => {
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
});

app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`);
});
