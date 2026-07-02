/*========================
    Índice de Rutas
========================*/
import { Router } from 'express';
import productoRoutes from './producto.routes.js';
import ventaRoutes from './venta.routes.js';

const router = Router();

router.use('/productos', productoRoutes);
router.use('/ventas', ventaRoutes);

export default router;
