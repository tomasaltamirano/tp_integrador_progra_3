//importaciones

import express from 'express';
import enviroments from './src/api/config/enviroments.js';
import connection from './src/api/database/db.js';

const app = express();
const PORT = 3000;
//configuraciones

app.get('/', (req, res) => {
	res.send('Hola Mundo desde tp_integrador');
});

app.get('/api/products', async (req, res) => {
	const resultados = await connection.query('SELECT * FROM products');
	res.json(resultados);
});

app.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${PORT}`);
});
