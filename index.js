/*========================
    Importaciones
========================*/
import express from 'express';
import cors from 'cors';
import environments from './src/api/config/environments.js';
import { loggerURL } from './src/api/middlewares/middlewares.js';
import { __dirname, join } from './src/api/utils/index.js';
import apiRoutes from './src/api/routes/index.js';

/*========================
    Config
========================*/
const app = express();
const PORT = environments.port;

/*========================
    Middlewares globales
========================*/
app.use(cors());
app.use(loggerURL);
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

/*========================
    Rutas
========================*/
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
	res.send('Servidor UTN Videogames corriendo');
});

/*========================
    Servidor
========================*/
app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`);
});
