/*========================
    Importaciones
========================*/
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import environments from './src/api/config/environments.js';
import { loggerURL } from './src/api/middlewares/middlewares.js';
import { __dirname, join } from './src/api/utils/index.js';
import apiRoutes from './src/api/routes/index.js';
import viewRoutes from './src/api/routes/view.routes.js';
import authRoutes from './src/api/routes/auth.routes.js';

/*========================
    Config
========================*/
const app = express();
const PORT = environments.port;
console.log('CONTRASEÑA BD:', environments.database.password);
console.log('USUARIO BD:', environments.database.user);

// Configuramos EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'src/api/views'));

/*========================
    Middlewares globales
========================*/
app.use(cors());
app.use(loggerURL);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para leer formularios HTML
app.use(express.static(join(__dirname, 'public')));

// Sesiones para el login
app.use(
	session({
		secret: 'utn_videogames_secret',
		resave: false,
		saveUninitialized: true,
	}),
);

/*========================
    Rutas
========================*/
app.use('/api', apiRoutes);
app.use('/dashboard', viewRoutes);
app.use('/login', authRoutes);

app.get('/', (req, res) => {
	res.redirect('/login');
});

/*========================
    Servidor
========================*/
app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`);
});
