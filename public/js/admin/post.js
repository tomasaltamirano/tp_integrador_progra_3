document.getElementById('postProduct-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const mensajes = document.getElementById('contenedor-mensajes');

    const producto = {
        nombre: form.nombre.value,
        imagen: form.imagen.value,
        descripcion: form.descripcion.value,
        categoria: form.categoria.value,
        precio: Number(form.precio.value), // ← antes era string, ahora number
    };

    try {
        const res = await fetch('/api/productos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto),
        });
        const data = await res.json();

        if (!res.ok) {
            mensajes.innerHTML = `<p>${data.error}</p>`;
            return;
        }

        mensajes.innerHTML = `<p>${data.mensaje} (ID: ${data.id})</p>`;
        form.reset();
    } catch (error) {
        mensajes.innerHTML = `<p>Error al crear el producto</p>`;
    }
});