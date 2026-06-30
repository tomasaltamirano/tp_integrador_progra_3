/*========================
    Middlewares
========================*/

// Middleware logger para ver en consola toda la actividad del servidor
export const loggerURL = (req, res, next) => {
	let fecha = new Date();
	console.log(
		`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`,
	);
	next();
};

// Middleware para validar que el ID sea un número entero positivo
export const validateId = (req, res, next) => {
	const id = Number(req.params.id);

	if (!Number.isInteger(id) || id <= 0) {
		return res.status(400).json({
			message: 'El ID debe ser un numero entero positivo',
		});
	}

	req.id = id;
	next();
};

// Middleware para validar los campos de un producto
const categoriasValidas = ['fisico', 'digital'];

export const validateProducto = (req, res, next) => {
	const { nombre, precio, descripcion, imagen, categoria } = req.body;
	const errores = [];

	if (!nombre || !descripcion || !imagen || !categoria || !precio) {
		errores.push('Faltan campos requeridos');
	}

	if (typeof nombre !== 'string' || nombre.trim().length < 2) {
		errores.push('El nombre debe tener al menos 2 caracteres');
	}

	if (typeof precio !== 'number' || precio <= 0) {
		errores.push('El precio debe ser un numero mayor a 0');
	}

	if (!categoriasValidas.includes(categoria)) {
		errores.push('La categoria debe ser fisico o digital');
	}

	if (errores.length > 0) {
		return res.status(400).json({
			message: 'Datos invalidos',
			listaErrores: errores,
		});
	}

	next();
};

// Middleware para validar los campos de una venta
export const validateVenta = (req, res, next) => {
	const { nombre_cliente, precio_total, productos } = req.body;
	const errores = [];

	if (!nombre_cliente || !precio_total || !productos) {
		errores.push('Faltan campos requeridos');
	}

	if (typeof nombre_cliente !== 'string' || nombre_cliente.trim().length < 2) {
		errores.push('El nombre del cliente debe tener al menos 2 caracteres');
	}

	if (typeof precio_total !== 'number' || precio_total <= 0) {
		errores.push('El precio total debe ser un numero mayor a 0');
	}

	if (!Array.isArray(productos) || productos.length === 0) {
		errores.push('Debe haber al menos un producto en la venta');
	}

	if (errores.length > 0) {
		return res.status(400).json({
			message: 'Datos invalidos',
			listaErrores: errores,
		});
	}

	next();
};

// Middleware de protección de rutas — redirige al login si no hay sesión
export const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};