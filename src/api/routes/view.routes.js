/*========================
    Rutas de vistas
========================*/
import { Router } from 'express';
import { indexView, getView, postView, putView, deleteView } from '../controllers/view.controllers.js';
import { requireLogin } from '../middlewares/middlewares.js';

const router = Router();

router.get('/index', requireLogin, indexView);
router.get('/consultar', requireLogin, getView);
router.get('/crear', requireLogin, postView);
router.get('/modificar', requireLogin, putView);
router.get('/eliminar', requireLogin, deleteView);

export default router;