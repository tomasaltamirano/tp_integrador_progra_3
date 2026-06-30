/*========================
    Controladores de vistas
========================*/
import ProductoModels from '../models/product.models.js';

export const indexView = async (req, res) => {
    try {
        const [rows] = await ProductoModels.selectAllProductos();
        res.render('index', {
            title: 'Dashboard',
            about: 'Inventario de productos',
            productosArray: rows,
        });
    } catch (error) {
        console.error(error);
    }
};

export const getView = (req, res) => {
    res.render('get', { title: 'Consultar', about: 'Consultar producto por ID' });
};

export const postView = (req, res) => {
    res.render('post', { title: 'Crear', about: 'Crear nuevo producto' });
};

export const putView = (req, res) => {
    res.render('put', { title: 'Modificar', about: 'Modificar producto por ID' });
};

export const deleteView = (req, res) => {
    res.render('delete', { title: 'Eliminar', about: 'Eliminar producto por ID' });
};