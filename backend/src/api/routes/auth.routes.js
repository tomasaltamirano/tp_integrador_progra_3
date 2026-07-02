/*========================
    Rutas de autenticación
========================*/
import { Router } from 'express';
import { loginView, loginUser } from '../controllers/auth.controllers.js';

const router = Router();

router.get('/', loginView);
router.post('/', loginUser);

router.get('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/login');
});

export default router;
