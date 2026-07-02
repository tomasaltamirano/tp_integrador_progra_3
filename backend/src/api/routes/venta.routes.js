/*========================
    Rutas de Ventas
========================*/
import { Router } from 'express';
import {
	obtenerVentas,
	registrarVenta,
} from '../controllers/venta.controller.js';
import { validateVenta } from '../middlewares/middlewares.js';

const router = Router();

router.get('/', obtenerVentas);
router.post('/', validateVenta, registrarVenta);

export default router;
