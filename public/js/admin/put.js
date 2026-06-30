document.getElementById('buscarProducto-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('idBuscar').value;
    const contenedorForm = document.getElementById('contenedor-form');

    try {
        const res = await fetch(`/api/productos/${id}`);
        const data = await res.json();

        if (!res.ok) {
            contenedorForm.innerHTML = `<p>${data.error}</p>`;
            return;
        }

        const p = data.payload;
        contenedorForm.innerHTML = `
            <form id="editProduct-form">
                <label>Nombre</label>
                <input type="text" name="nombre" value="${p.nombre}" required>
                <label>Imagen</label>
                <input type="text" name="imagen" value="${p.imagen}" required>
                <label>Descripción</label>
                <input type="text" name="descripcion" value="${p.descripcion}" required>
                <label>Categoría</label>
                <select name="categoria">
                    <option value="fisico" ${p.categoria === 'fisico' ? 'selected' : ''}>Físico</option>
                    <option value="digital" ${p.categoria === 'digital' ? 'selected' : ''}>Digital</option>
                </select>
                <label>Precio</label>
                <input type="number" step="0.01" name="precio" value="${p.precio}" required>
                <button type="submit">Guardar cambios</button>
            </form>
        `;

        document.getElementById('editProduct-form').addEventListener('submit', async (ev) => {
            ev.preventDefault();
            const form = ev.target;
            const mensajes = document.getElementById('contenedor-mensajes');

            const productoEditado = {
                nombre: form.nombre.value,
                imagen: form.imagen.value,
                descripcion: form.descripcion.value,
                categoria: form.categoria.value,
                precio: Number(form.precio.value), // ← antes era string, ahora number
            };

            const resPut = await fetch(`/api/productos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productoEditado),
            });
            const dataPut = await resPut.json();
            mensajes.innerHTML = `<p>${dataPut.mensaje || dataPut.error}</p>`;
        });
    } catch (error) {
        contenedorForm.innerHTML = `<p>Error al buscar el producto</p>`;
    }
});