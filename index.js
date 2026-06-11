import express from 'express';
import connection from './src/api/database/db.js'; // Importamos la conexion de nuestra BBDD
import environments from './src/api/config/environments.js'; // Traemos el puerto del .env

const PORT = environments.port;
const app = express();

app.get('/', (req, res) => {
	res.send('Hola mundo!');
});

// Creamos un endpoint minimo para verificar la conexion a la BBDD
// localhost:3000/products es nuestro endpoint, es decir la URL especifica de nuestra API Rest para obtener un recurso

app.get('/api/productos', async (req, res) => {
	// Nuestra app atenderá peticiones get a la url /products
	try {
		const [rows] = await connection.query('SELECT * FROM productos'); // Le pasamos la siguiente consulta SQL
		res.status(200).json({
			// La respuesta que nos proporciona el objeto res devolverá el JSON
			payload: rows,
		});
	} catch (error) {
		console.error('Error obteniendo productos: ', error.message);
	}
});

app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`);
});
