/*========================
    Rutas de Productos
========================*/
import { Router } from 'express';
import {
	obtenerProductos,
	obtenerProductoPorId,
	crearProducto,
	editarProducto,
	desactivarProducto,
	activarProducto,
} from '../controllers/producto.controller.js';
import { validateId, validateProducto } from '../middlewares/middlewares.js';

const router = Router();

router.get('/', obtenerProductos);
router.get('/:id', validateId, obtenerProductoPorId);
router.post('/', validateProducto, crearProducto);
router.put('/:id', validateId, validateProducto, editarProducto);
router.put('/:id/desactivar', validateId, desactivarProducto);
router.put('/:id/activar', validateId, activarProducto);

export default router;
