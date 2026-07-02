/*========================
    Controladores de autenticación
========================*/

export const loginView = (req, res) => {
    res.render('login', { title: 'Login', about: 'Ingresá tus credenciales' });
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Por ahora validación simple (después conectamos con la BD)
    if (email === 'admin@utn.com' && password === 'admin123') {
        req.session.user = { email };
        return res.redirect('/dashboard/index');
    }

    res.render('login', {
        title: 'Login',
        about: 'Ingresá tus credenciales',
        error: 'Credenciales incorrectas',
    });
};